import {Inject, Injectable} from '@nestjs/common';
import {Constants} from '../common/constants';
import {ClientProxy} from '@nestjs/microservices';
import {IUser} from './user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(Constants.UserService) private readonly client: ClientProxy) {
  }

  public getById(userId: string): Promise<IUser> {
    return this.client.send<IUser>(Constants.GetUserByIdCmd, {userId}).toPromise();
  }
}
