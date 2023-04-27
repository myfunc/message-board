import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        if (process.env.NODE_ENV !== "test") {
            await this.$connect();
        }
    }

    async enableShutdownHooks(app: INestApplication) {
        if (process.env.NODE_ENV !== "test") {
            this.$on("beforeExit", async () => {
                await app.close();
            });
        }
    }
}
