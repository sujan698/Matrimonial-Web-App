import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.use(express.json({limit: '50mb'}));
  await app.listen(3000);
}
bootstrap();
