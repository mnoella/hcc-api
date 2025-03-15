import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
    @ApiProperty({ example: "Important club announcement"})
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({ example: "We are excited to announce our new training schedule !!!"})
    @IsNotEmpty()
    @IsString()
    content: string
}