import { ConflictException, NotFoundException } from "@nestjs/common";

export class RecordNotFoundException extends NotFoundException {
    constructor() {
        super("Record not found");
    }
}

export class RecordConflictException extends ConflictException {
    constructor() {
        super("Record conflict");
    }
}
