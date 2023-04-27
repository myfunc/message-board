import { Injectable } from "@nestjs/common";

@Injectable()
export class IdempotencyService {
    // Can be replaced with a Redis cache
    // Need to implement auto clean up by TTL
    private idempotencyKeys = new Set<string>();

    addKey(key: string) {
        this.idempotencyKeys.add(key);
    }

    hasKey(key: string) {
        return this.idempotencyKeys.has(key);
    }

    deleteKey(key: string) {
        this.idempotencyKeys.delete(key);
    }
}
