import { IsInt } from 'class-validator';

export class MatchDto {
  @IsInt()
  user1Id: number;

  @IsInt()
  user2Id: number;
}
