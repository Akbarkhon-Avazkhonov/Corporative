import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  });

  const config = new DocumentBuilder()
    .setTitle('Admin, Referral and Corporative API')
    .setVersion('0.0.1')
    .addServer('/')
    .addServer('/api')
    .addBearerAuth({
      description: 'Default JWT Authorization',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: [
      'https://euphoria-group.uz/',
      'flashcloud.uz',
      '1c.corp.euphoriagroup.uz',
      'http://localhost:3000',
      'https://euphoria-admin.uz',
      'https://euphoria-referral.uz',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(4000);
}
bootstrap();
