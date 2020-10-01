import {Inject, Injectable} from '@nestjs/common';
import {Constants} from '../common/constants';
import {ClientProxy} from '@nestjs/microservices';
import {IPost} from './post.interface';

@Injectable()
export class PostService {

  constructor(@Inject(Constants.PostService) private readonly client: ClientProxy) {
  }

  public get(userId: string, count: number): Promise<IPost[]> {
    return this.client.send<IPost[]>(Constants.GetPostsCmd, {userId, count}).toPromise();
  }
}
