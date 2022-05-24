import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import multipart from "fastify-multipart";
import { ValidationPipe } from '@nestjs/common/pipes';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter()/*, { cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  }}*/);
  app.register(multipart);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
