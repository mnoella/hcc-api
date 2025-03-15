import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({ example: "John"})
    @IsNotEmpty()
    @IsString()
    firstName: string

    @ApiProperty({ example: "Doe"})
    @IsNotEmpty()
    @IsString()
    lastName: string

    @ApiProperty({ example: "john.doe@example.com" })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ example: "Mypassword1_"})
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string
}