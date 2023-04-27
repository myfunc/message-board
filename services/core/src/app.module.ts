import { Module } from "@nestjs/common";
import { MessageModule } from "./message/message.module";
import { SystemModule } from "./system/system.module";

@Module({
    imports: [MessageModule, SystemModule],
})
export class AppModule {}
