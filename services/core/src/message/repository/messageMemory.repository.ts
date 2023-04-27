import { Injectable } from "@nestjs/common";
import { IMessageRepository } from "./interface";
import { Message } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import {
    CreateOneMessageDto,
    DeleteOneMessageDto,
    FindManyMessagesDto,
} from "../controller/message.dto";

@Injectable()
export class MessageMemoryRepository implements IMessageRepository {
    private messages: Message[] = [];

    constructor() {}

    async deleteOneMessage(args: DeleteOneMessageDto): Promise<void> {
        this.messages = this.messages.filter(
            (message) => message.id !== args.id
        );
    }
    async deleteAllMessages(): Promise<void> {
        this.messages = [];
    }

    public async createOneMessage(args: CreateOneMessageDto) {
        this.messages.push({
            ...args,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    public async findManyMessages(
        args: FindManyMessagesDto
    ): Promise<Message[]> {
        return this.messages.slice(args.skip, args.take || 10);
    }
}
