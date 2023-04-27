import { Module } from "@nestjs/common";
import { IdempotentInterceptor } from "./idempotent.interceptor";
import { IdempotencyService } from "./idempotency.service";

@Module({
    providers: [IdempotentInterceptor, IdempotencyService],
    exports: [IdempotencyService],
})
export class IdemptotencyModule {}
