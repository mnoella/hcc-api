import { Module } from '@nestjs/common';
import { ActualiteService } from './actualite.service';
import { ActualiteController } from './actualite.controller';

@Module({
  providers: [ActualiteService],
  controllers: [ActualiteController]
})
export class ActualiteModule {}
