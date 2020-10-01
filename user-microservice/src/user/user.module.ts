import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Constants} from '../common/constants';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserSchema} from './models/user';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Constants.UserModel, schema: UserSchema}])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService
  ]
})
export class UserModule {
}
