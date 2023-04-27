import { DynamicModule, Global, Module } from "@nestjs/common";
import { IdemptotencyModule } from "./idempotency/idempotency.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
    imports: [
        IdemptotencyModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [PrismaService],
    exports: [IdemptotencyModule, PrismaService],
})
export class SystemModule {}
