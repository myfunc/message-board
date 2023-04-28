import { Injectable, NotFoundException } from "@nestjs/common";
import { IMessageRepository } from "./interface";
import { PrismaService } from "src/system/prisma.service";
import {
    CreateOneMessageDto,
    DeleteOneMessageDto,
    FindManyMessagesDto,
} from "../controller/message.dto";
import { Message } from "@prisma/client";
import {
    RecordConflictException,
    RecordNotFoundException,
} from "src/errors/base.error";

@Injectable()
export class MessageDBRepository implements IMessageRepository {
    constructor(private readonly prisma: PrismaService) {}
    async deleteOneMessage(args: DeleteOneMessageDto): Promise<void> {
        try {
            await this.prisma.message.delete({
                where: {
                    id: args.id,
                },
            });
        } catch (error) {
            if (error?.code === "P2025") {
                throw new RecordNotFoundException();
            }
            throw error;
        }
    }
    async deleteAllMessages(): Promise<void> {
        await this.prisma.message.deleteMany();
    }

    public async findManyMessages(
        args: FindManyMessagesDto
    ): Promise<Message[]> {
        return await this.prisma.message.findMany({
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                author: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: args.take || 10,
            skip: args.skip,
        });
    }

    public async createOneMessage(args: CreateOneMessageDto) {
        try {
            await this.prisma.message.create({
                data: {
                    ...args,
                },
            });
        } catch (error) {
            if (error?.code === "P2002") {
                throw new RecordConflictException();
            }
            throw error;
        }
    }
}
