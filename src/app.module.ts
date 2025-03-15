import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { NewsModule } from './news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  // Configuration globale de TypeORM
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'hcc.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // Configuration globale pour les variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    UsersModule,
    NewsModule,
    MatchesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
