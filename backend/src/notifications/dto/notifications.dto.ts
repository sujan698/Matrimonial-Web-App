import { IsInt, IsString } from 'class-validator';

export class NotificationDto {
  @IsInt()
  userId: number;

  @IsString()
  message: string;
}
