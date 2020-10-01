import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {PostModule} from './post/post.module';
import {EventHandlersModule} from './event-handlers/event-handlers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('DB_URI'),
        useNewUrlParser: true
      }),
      inject: [ConfigService],
    }),
    PostModule,
    EventHandlersModule,
  ],
})
export class AppModule {
}
