import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole, UserStatus } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty({ example: "John" })
    @IsNotEmpty()
    @IsString()
    firstName: string

    @ApiProperty({ example: "Doe" })
    @IsNotEmpty()
    @IsString()
    lastName: string

    @ApiProperty({ example: "john.doe@example.com" })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @ApiProperty({ enum: UserRole, default: UserRole.PLAYER })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole = UserRole.PLAYER

    @ApiProperty({ enum: UserStatus, default: UserStatus.PENDING })
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus = UserStatus.PENDING
}