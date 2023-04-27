import { Transform } from "class-transformer";
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Max,
} from "class-validator";

export class IdDto {
    @IsUUID()
    @IsString()
    id: string;
}

export class PaginationDto {
    @Max(100)
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    take?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    skip?: number;
}

export class CreateOneMessageDto extends IdDto {
    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}

export class DeleteOneMessageDto extends IdDto {}

export class FindManyMessagesDto extends PaginationDto {}
