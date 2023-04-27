import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Query,
} from "@nestjs/common";
import { MessageService } from "../message.service";
import {
    CreateOneMessageDto,
    DeleteOneMessageDto,
    PaginationDto,
} from "./message.dto";
import { Idempotent } from "src/system/idempotency/idempotent.interceptor";

@Controller("messages")
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Idempotent((_, args) => args.id)
    @Post()
    @HttpCode(201)
    public async createOneMessage(@Body() args: CreateOneMessageDto) {
        return await this.messageService.createOneMessage(args);
    }

    @Get()
    public async findManyMessages(@Query() args: PaginationDto) {
        return await this.messageService.findManyMessages(args);
    }

    @Delete("all")
    public async deleteAllMessages() {
        return await this.messageService.deleteAllMessages();
    }

    @Delete(":id")
    public async deleteOneMessage(@Param() args: DeleteOneMessageDto) {
        return await this.messageService.deleteOneMessage(args);
    }
}
