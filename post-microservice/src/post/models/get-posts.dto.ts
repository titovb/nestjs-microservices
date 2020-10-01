import {IsMongoId, IsNumber, Min} from 'class-validator';

export class GetPostsDto {
  @IsMongoId()
  userId: string;

  @IsNumber()
  @Min(1)
  count: number;
}
