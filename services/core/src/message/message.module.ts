import { Module } from "@nestjs/common";
import { MessageDBRepository } from "./repository/messageDB.repository";
import { MessageService } from "./message.service";
import { MessageController } from "./controller/message.controller";
import { MessageMemoryRepository } from "./repository/messageMemory.repository";
import { DIMessageRepository } from "./repository/interface";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/system/prisma.service";

@Module({
    controllers: [MessageController],
    providers: [
        MessageService,
        {
            provide: DIMessageRepository,
            useFactory: (
                configService: ConfigService,
                prismaService: PrismaService
            ) => {
                switch (configService.get("ENVIRONMENT")) {
                    case "test":
                        return new MessageMemoryRepository();
                    default:
                        return new MessageDBRepository(prismaService);
                }
            },
            inject: [ConfigService, PrismaService],
        },
    ],
})
export class MessageModule {}
