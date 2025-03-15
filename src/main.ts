import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle("HCC API")
    .setDescription("API REST pour le Club de Handball de Comines")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log("App is running on: http://localhost:3000");
  console.log("Swagger documentation is available at: http://localhost:3000/api")
}
bootstrap();
