import { Interests } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateInterestDto {
  @IsEnum(Interests)
  interest: Interests;
}
