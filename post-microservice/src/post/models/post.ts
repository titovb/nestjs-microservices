import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

@Schema({collection: 'post', id: false})
export class Post extends Document {
  @Prop({nullable: false})
  imageUrl: string;

  @Prop({type: [Types.ObjectId], default: [], index: true})
  users: any[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
