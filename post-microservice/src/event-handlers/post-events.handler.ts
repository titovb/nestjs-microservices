import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {IPostEvent, PostEvents, UpdatePostsByUserEvent} from './post.events';
import {PostService} from '../post/post.service';
import {Logger} from '@nestjs/common';

@EventsHandler(UpdatePostsByUserEvent)
export class PostEventsHandler implements IEventHandler<IPostEvent> {
  constructor(private readonly postService: PostService) {
  }

  handle(event: IPostEvent): void {
    switch (event.type) {
      case PostEvents.UpdatePostsByUser:
        this.handleUpdatePostsByUser(event);
        break;
      default:
        break;
    }
  }

  private handleUpdatePostsByUser(event: UpdatePostsByUserEvent): void {
    setImmediate(async () => {
      const userId = event.data.userId;
      const postsIds = event.data.postsIds;
      try {
        await this.postService.updateByUser(userId, postsIds);
      } catch(err) {
        Logger.warn(`Unable to update posts by user. Posts count '${postsIds.length}', userId '${userId}'. ${err.message}`);
      }
    });
  }
}
