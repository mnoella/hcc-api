import { Body, Controller, Post, UseGuards, Request, Get, Patch, Param, Delete } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/users/entities/user.entity";
import { MatchesService } from "./matches.service";

@Controller("matches")
export class MatchesController {
    constructor(private readonly matchesService: MatchesService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.COACH)
    @Post()
    create(@Body() matchData: any, @Request() req) {
        return this.matchesService.create(matchData, req.user);
    }

    @Get()
    findAll() {
        return this.matchesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.matchesService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.COACH)
    @Patch(":id")
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.matchesService.update(+id, updateData)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.PLAYER)
    @Post(":id/register")
    register(@Param('id') id: string, @Request() req) {
        return this.matchesService.registerPlayer(+id, req.user.id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.PLAYER)
    @Delete(":id/register")
    unregister(@Param('id') id: string, @Request() req) {
        return this.matchesService.unregisterPlayer(+id, req.user.id)
    }
}