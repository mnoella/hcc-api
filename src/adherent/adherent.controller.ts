import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AdherentService } from './adherent.service';
import { AdherentEntity } from './adherent.entity';

@Controller('adherent')
export class AdherentController {
    constructor(private readonly adherentService: AdherentService) {}

    // READ
    @Get()
    async getAllAdherents(): Promise<AdherentEntity[]> {
        return this.adherentService.getAllAdherents();
    }

    // READ
    @Get(':id')
    async getAdherentById(@Param('id') id: number): Promise<AdherentEntity | null> {
        return this.adherentService.getAdherentById(id);
    }

    // CREATE
    @Post()
    async createAdherent(@Body() adherentData: Partial<AdherentEntity>): Promise<AdherentEntity> {
        return this.adherentService.createAdherent(adherentData);
    }

    // DELETE
    @Delete(':id')
    async deleteAdherent(@Param('id') id: number): Promise<void> {
        return this.adherentService.deleteAdherent(id);
    }

    // UPDATE
}
