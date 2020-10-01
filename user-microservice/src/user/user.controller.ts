import {Controller, UsePipes} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {Constants} from '../common/constants';
import {UserService} from './user.service';
import {GetOneUserDto} from './models/get-one-user.dto';
import {User} from './models/user';
import {RpcValidationPipe} from '../common/rpc-validation.pipe';

@UsePipes(new RpcValidationPipe())
@Controller()
export class UserController {
  constructor(private readonly service: UserService) {
  }

  @MessagePattern(Constants.GetUserByIdCmd)
  public get(@Payload() payload: GetOneUserDto): Promise<User> {
    return this.service.getById(payload.userId);
  }
}
