import { IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoleDto {
    @ApiProperty({enum: UserRole})
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole
}