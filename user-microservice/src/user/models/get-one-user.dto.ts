import {IsMongoId} from 'class-validator';

export class GetOneUserDto {
  @IsMongoId()
  userId: string;
}
