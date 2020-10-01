import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PostController} from './post.controller';
import {PostService} from './post.service';
import {Constants} from '../common/constants';
import {PostSchema} from './models/post';
import {CqrsModule} from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Constants.PostModel, schema: PostSchema}]),
    CqrsModule
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {
}
