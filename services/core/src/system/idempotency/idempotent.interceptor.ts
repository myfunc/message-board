import {
    applyDecorators,
    BadRequestException,
    CallHandler,
    createParamDecorator,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    SetMetadata,
    UseInterceptors,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IdempotencyService } from "./idempotency.service";
import { catchError, throwError } from "rxjs";

const IDEMPOTENT_KEY = "idempotent_key";

export const Idempotent = (keyProvider: (req, args) => any) => {
    return applyDecorators(
        SetMetadata(IDEMPOTENT_KEY, keyProvider),
        UseInterceptors(IdempotentInterceptor)
    );
};

@Injectable()
export class IdempotentInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector,
        private readonly idempotencyService: IdempotencyService
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const handler = context.getHandler();
        const keyProvider = this.reflector.get(IDEMPOTENT_KEY, handler);

        const idempotentKey = keyProvider(request, request.body);

        if (!this.idempotencyService.hasKey(idempotentKey)) {
            this.idempotencyService.addKey(idempotentKey);
            return next.handle().pipe(
                catchError((err) => {
                    void this.idempotencyService.deleteKey(idempotentKey);

                    return throwError(() => err);
                })
            );
        }

        throw new BadRequestException("Method with this id already called");
    }
}
