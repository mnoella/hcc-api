import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ActualiteModule } from './actualite/actualite.module';
import { MatchModule } from './match/match.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdherentModule } from './adherent/adherent.module';

@Module({
  // Configuration globale de TypeORM
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // Configuration globale pour les variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    ActualiteModule, 
    MatchModule, AdherentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
