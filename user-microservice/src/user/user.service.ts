import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Constants} from '../common/constants';
import {User} from './models/user';
import {Model} from 'mongoose';
import {RpcException} from '@nestjs/microservices';

@Injectable()
export class UserService {

  constructor(@InjectModel(Constants.UserModel) private readonly model: Model<User>) {
  }

  public getById(userId: string): Promise<User> {
    return this.model.findById(userId).exec()
      .then(user => {
        if (!user) throw new RpcException(`User with id '${userId}' was not found.`);
        return user;
      })
      .catch(err => {
        throw new RpcException(`Unable to find user by id. ${err.message}`);
      });
  }
}
