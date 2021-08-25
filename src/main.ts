import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  const pathname = `/Users/boatprakit/Desktop/Dev/projects/int222-be-nest/public/images`;
  // app.use(express.static(join(__dirname, '..', 'public')));
  app.use(express.static(pathname));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
