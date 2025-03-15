import { CreateNewsDto } from "src/news/dto/create-news.dto";
import { PartialType } from '@nestjs/swagger';


export class UpdateNewsDto extends PartialType(CreateNewsDto) {}