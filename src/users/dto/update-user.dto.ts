import { IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class UpdateRoleDto {
    @ApiProperty({ enum: UserRole })
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole
}