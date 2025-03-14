import { IsEnum, IsNotEmpty } from "class-validator";
import { UserStatus } from "../entities/user.entity";

export class UpdateStatusDto {
    @ApiProperty({enum: UserStatus})
    @IsNotEmpty()
    @IsEnum(UserStatus)
    status: UserStatus
}