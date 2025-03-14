import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole, UserStatus } from "./entities/user.entity";
import { Roles } from "src/auth/decorators/roles.decorator";

@Controller("users")
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.COACH)
    @Patch(":id/status")
    updateStatus(@Param('id') id: string, @Body() body: {status: UserStatus}) {
        return this.usersService.updateStatus(+id, body.status);
    }
}