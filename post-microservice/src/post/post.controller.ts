import {Controller, UsePipes} from '@nestjs/common';
import {PostService} from './post.service';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {Constants} from '../common/constants';
import {GetPostsDto} from './models/get-posts.dto';
import {Post} from './models/post';
import {RpcValidationPipe} from '../common/rpc-validation.pipe';

@UsePipes(new RpcValidationPipe())
@Controller()
export class PostController {
  constructor(private readonly service: PostService) {
  }

  @MessagePattern(Constants.GetPostsCmd)
  public get(@Payload() payload: GetPostsDto): Promise<Post[]> {
    return this.service.get(payload);
  }
}
