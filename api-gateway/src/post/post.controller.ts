import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {IPost} from './post.interface';
import {UserGuard} from '../common/user.guard';
import {User} from '../common/user.decorator';
import {PostService} from './post.service';
import {IntParserPipe} from '../common/int-parser.pipe';

@Controller('feed')
@UseGuards(UserGuard)
export class PostController {

  constructor(private readonly postService: PostService) {
  }

  @Get()
  public get(@Query('count', new IntParserPipe({default: 50, min: 1})) count: number,
             @User() userId: string): Promise<IPost[]> {
    return this.postService.get(userId, count);
  }
}
