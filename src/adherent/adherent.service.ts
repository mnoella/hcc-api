import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdherentEntity } from './adherent.entity';

@Injectable()
export class AdherentService {
    constructor(
        @InjectRepository(AdherentEntity)
        private adherentRepository: Repository<AdherentEntity>,
    ) {}

    async getAllAdherents(): Promise<AdherentEntity[]> {
        return this.adherentRepository.find();
    }

    async getAdherentById(id: number): Promise<AdherentEntity | null> {
        return this.adherentRepository.findOne({ where: { id } });
    }

    async createAdherent(adherentData: Partial<AdherentEntity>): Promise<AdherentEntity> {
        const adherent = this.adherentRepository.create(adherentData);
        return this.adherentRepository.save(adherent);
    }

    async deleteAdherent(id: number): Promise<void> {
        await this.adherentRepository.delete(id);
    }
}
