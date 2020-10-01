export enum PostEvents {
  UpdatePostsByUser = 'UpdatePostsByUser'
}

export interface IPostEvent {
  readonly type: PostEvents;
  readonly data;
}

export class UpdatePostsByUserEvent implements IPostEvent {
  readonly type = PostEvents.UpdatePostsByUser;

  constructor(public data: {postsIds: string[], userId: string}) {
  }
}
