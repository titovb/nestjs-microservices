import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './user/user.module';

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
    UserModule
  ]
})
export class AppModule {
}
