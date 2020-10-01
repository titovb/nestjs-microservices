import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({collection: 'user', id: false})
export class User extends Document {
  @Prop({nullable: false, unique: true, index: true})
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
