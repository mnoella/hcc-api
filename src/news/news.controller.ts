import { Body, Controller, Post, UseGuards, Request, Get, Param } from "@nestjs/common";
import { NewsService } from "./news.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/users/entities/user.entity";

@Controller("news")
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CONTRIBUTOR, UserRole.COACH)
    @Post()
    create(@Body() newsData: any, @Request() req) {
        return this.newsService.create(newsData, req.user);
    }

    @Get()
    findAll(){
        return this.newsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsService.findOne(+id);
    }

}