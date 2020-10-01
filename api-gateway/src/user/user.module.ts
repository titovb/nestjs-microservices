import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {Constants} from '../common/constants';

@Module({
  imports: [
    ClientsModule.registerAsync([{
      imports: [ConfigModule],
      name: Constants.UserService,
      useFactory: (config: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [config.get('AMWP_URL')],
          queue: config.get('USER_AMWP_QUEUE'),
          queueOptions: {
            durable: false
          }
        }
      }),
      inject: [ConfigService]
    }])
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
