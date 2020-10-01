import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from '@nestjs/microservices';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMWP_URL],
      queue: process.env.AMWP_QUEUE,
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen(() => Logger.log('Post microservice has started'));
}
bootstrap();
