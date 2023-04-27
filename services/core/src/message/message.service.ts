import { Inject, Injectable } from "@nestjs/common";
import {
    DIMessageRepository,
    IMessageRepository,
} from "./repository/interface";
import {
    CreateOneMessageDto,
    DeleteOneMessageDto,
    FindManyMessagesDto,
    PaginationDto,
} from "./controller/message.dto";

@Injectable()
export class MessageService {
    constructor(
        @Inject(DIMessageRepository)
        private messageRepository: IMessageRepository
    ) {}

    public async createOneMessage(args: CreateOneMessageDto) {
        await this.messageRepository.createOneMessage(args);
        return {
            success: true,
        };
    }

    public async findManyMessages(args: FindManyMessagesDto) {
        return {
            data: await this.messageRepository.findManyMessages(args),
        };
    }

    public async deleteOneMessage(args: DeleteOneMessageDto) {
        await this.messageRepository.deleteOneMessage(args);
        return {
            success: true,
        };
    }

    public async deleteAllMessages() {
        await this.messageRepository.deleteAllMessages();
        return {
            success: true,
        };
    }
}
