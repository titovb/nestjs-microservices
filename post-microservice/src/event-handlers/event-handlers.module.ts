import {Module} from '@nestjs/common';
import {PostModule} from '../post/post.module';
import {PostEventsHandler} from './post-events.handler';

@Module({
  imports: [PostModule],
  providers: [PostEventsHandler]
})
export class EventHandlersModule {
}
