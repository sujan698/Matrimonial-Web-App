import { IsInt } from 'class-validator';

export class LikeDto {
  @IsInt()
  userId: number;

  @IsInt()
  likedId: number;
}
