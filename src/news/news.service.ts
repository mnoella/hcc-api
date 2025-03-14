import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsEntity } from "./entities/news.entity";
import { Repository } from "typeorm";

@Injectable()
export class NewsService {

    constructor(
        @InjectRepository(NewsEntity)
        private newsRepository: Repository<NewsEntity>,
    ) {}

    async create(newsData: any, author: any): Promise<NewsEntity> {
        const news = this.newsRepository.create({...newsData, author,});
        return this.newsRepository.save(news);
    }

    async findAll(): Promise<NewsEntity[]> {
        return this.newsRepository.find({ relations: ["author"], });
    }

    async findOne(id: number): Promise<NewsEntity> {
        const news = await this.newsRepository.findOne({
            where: { id },
            relations: ["author"],
        });

        if (!news) {
            throw new NotFoundException('News with ID ${id} not found');
        }

        return news;
    }
}