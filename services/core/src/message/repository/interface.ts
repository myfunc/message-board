import { Message } from "@prisma/client";
import {
    CreateOneMessageDto,
    DeleteOneMessageDto,
    FindManyMessagesDto,
} from "../controller/message.dto";

export const DIMessageRepository = Symbol("IMessageRepository");

export interface IMessageRepository {
    createOneMessage(args: CreateOneMessageDto): Promise<void>;
    findManyMessages(args: FindManyMessagesDto): Promise<Message[]>;
    deleteOneMessage(args: DeleteOneMessageDto): Promise<void>;
    deleteAllMessages(): Promise<void>;
}
