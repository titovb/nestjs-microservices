import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {isMongoId} from 'class-validator';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const user = req.headers.user;
      if (!user || !isMongoId(user)) return false;
      await this.userService.getById(user);
      req.user = user;
      return true;
    } catch (err) {
      return false;
    }
  }
}
