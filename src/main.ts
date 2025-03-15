import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder().setTitle("HCC API")
  await app.listen(process.env.PORT ?? 3000);
  console.log("App is running on http://localhost:3000");
}
bootstrap();
