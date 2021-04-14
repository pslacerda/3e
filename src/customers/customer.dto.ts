import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCustomerDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    nickname: string;
}


export class UpdateCustomerDto {
    @ApiProperty()
    id: number;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    nickname: string;
}

export class QueryDto {
    @ApiProperty()
    query: string
}


export class PaginatedQueryDto extends QueryDto {
    @ApiProperty({
        minimum: 0
    })
    skip: number

    @ApiProperty({
        minimum: 1
    })
    take: number
}