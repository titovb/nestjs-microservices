import {Module} from '@nestjs/common';
import {PostController} from './post.controller';
import {PostService} from './post.service';
import {UserModule} from '../user/user.module';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {Constants} from '../common/constants';

@Module({
  imports: [
    ClientsModule.registerAsync([{
      imports: [ConfigModule],
      name: Constants.PostService,
      useFactory: (config: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [config.get('AMWP_URL')],
          queue: config.get('POST_AMWP_QUEUE'),
          queueOptions: {
            durable: false
          }
        }
      }),
      inject: [ConfigService]
    }]),
    UserModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {
}
