import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Constants} from '../common/constants';
import {Post} from './models/post';
import {Model} from 'mongoose';
import {GetPostsDto} from './models/get-posts.dto';
import {EventBus} from '@nestjs/cqrs';
import {UpdatePostsByUserEvent} from '../event-handlers/post.events';

@Injectable()
export class PostService {

  constructor(@InjectModel(Constants.PostModel) private readonly model: Model<Post>,
              private readonly eventBus: EventBus) {
  }

  public async get(dto: GetPostsDto): Promise<Post[]> {
    const posts = await this.model.find({users: {$ne: dto.userId}}, {imageUrl: 1})
      .sort({_id: -1})
      .limit(dto.count)
      .exec();

    this.eventBus.publish<UpdatePostsByUserEvent>(new UpdatePostsByUserEvent({postsIds: posts.map(post => post._id), userId: dto.userId}));

    return posts;
  }

  public updateByUser(userId: string, postsIds: string[]) {
    return this.model.updateMany({_id: {$in: postsIds}}, {$push: {users: userId}}).exec();
  }
}
