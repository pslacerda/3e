import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class CreateCustomerDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    nickname: string;
}