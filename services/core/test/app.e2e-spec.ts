import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { MessageModule } from "src/message/message.module";
import { SystemModule } from "src/system/system.module";

import * as dotenv from "dotenv";
dotenv.config({ path: "test.env" });

describe("MessageController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MessageModule, SystemModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("Find messages with empty DB", () => {
        return request(app.getHttpServer())
            .get("/messages")
            .expect(200)
            .expect(`{"data":[]}`);
    });

    it("Add one message and find many", () => {
        const messageId = "10000000-3fff-43b6-9018-0664b8632f66";

        return request(app.getHttpServer())
            .post("/messages")
            .send({ id: messageId, content: "Hello", author: "Test" })
            .expect(201)
            .then(() => {
                return request(app.getHttpServer())
                    .get("/messages")
                    .expect(200)
                    .expect((res) => {
                        const data = res.body.data;
                        return (
                            data.id === messageId &&
                            data.content === "Hello" &&
                            data.author === "Test"
                        );
                    });
            });
    });

    it("Add one message then delete", () => {
        const messageId = "20000000-3fff-43b6-9018-0664b8632f66";

        return request(app.getHttpServer())
            .post("/messages")
            .send({ id: messageId, content: "Hello", author: "Test" })
            .expect(201)
            .then(() => {
                return request(app.getHttpServer())
                    .get("/messages")
                    .expect(200)
                    .expect((res) => {
                        const data = res.body.data;
                        return (
                            data.id === messageId &&
                            data.content === "Hello" &&
                            data.author === "Test"
                        );
                    });
            })
            .then(() => {
                return request(app.getHttpServer())
                    .delete(`/messages/${messageId}`)
                    .expect(200)
                    .expect(`{"success":true}`);
            })
            .then(() => {
                return request(app.getHttpServer())
                    .get("/messages")
                    .expect(200)
                    .expect(`{"data":[]}`);
            });
    });

    it("Test pagination", () => {
        const messageIds = [
            "30000000-3fff-43b6-9018-0664b8632f66",
            "40000000-3fff-43b6-9018-0664b8632f66",
            "50000000-3fff-43b6-9018-0664b8632f66",
        ];
        const createMessage = (id: string) =>
            request(app.getHttpServer())
                .post("/messages")
                .send({ id, content: "Hello", author: "Test" })
                .expect(201);

        return Promise.all(messageIds.map((id) => createMessage(id)))
            .then(() => {
                return request(app.getHttpServer())
                    .get("/messages?skip=2")
                    .expect(200);
            })
            .then((res) => {
                const data = res.body.data;
                expect(data).toHaveLength(1);
                expect(data[0].id).toBe(messageIds[2]);
                expect(data[0].content).toBe("Hello");
                expect(data[0].author).toBe("Test");
            });
    });
});
