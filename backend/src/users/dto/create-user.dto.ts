import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  dob: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters.' })
  password: string;

  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Gender must be one of the defined enum values.' })
  gender: Gender;

  @IsOptional()
  @IsString()
  googleId?: string;
}