import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMatchDto {
    @ApiProperty({ example: "2025-02-28" })
    @IsNotEmpty()
    @IsDateString()
    date: string

    @ApiProperty({ example: "Opponent 1"})
    @IsNotEmpty()
    @IsString()
    opponent: string

    @ApiProperty({ example: "Comines Club Hall"})
    @IsOptional()
    @IsString()
    location?: string
}