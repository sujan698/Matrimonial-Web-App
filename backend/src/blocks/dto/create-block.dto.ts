import { IsInt } from 'class-validator';

export class CreateBlockDto {
  @IsInt()
  blockedId: number;
}
