import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS for frontend applications
  app.enableCors({
    origin: true, // Allow requests from any origin during development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Use security headers
  app.use(helmet());

  // Use compression for better performance
  app.use(compression());

  // Enable validation pipes for all endpoints
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Set global prefix for all endpoints
  app.setGlobalPrefix('api');

  // Get port from environment variables or use default
  const port = configService.get<number>('PORT', 3000);
  
  app.use(
    '/uploads',
    express.static(join(__dirname, '..', 'uploads'), {
      setHeaders: (res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
      },
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
