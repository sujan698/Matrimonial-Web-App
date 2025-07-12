import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  receiverId: number;

  @IsString()
  messageContent: string;
}
