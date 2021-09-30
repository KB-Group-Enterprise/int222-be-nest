import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const pathname = process.env.IMAGE_PATH || '/images';
  app.useStaticAssets(pathname, { prefix: '/api/images' });
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    methods: '*',
  });
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
