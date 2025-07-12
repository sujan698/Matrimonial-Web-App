
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Gender } from '@prisma/client';

export class UpdateUserDto  {
    @IsString()
    fullname?: string;
  

    @IsEmail()
    email?: string;
  

    @IsString()
    dob?: string;
  

    @IsString()
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters.' })
    password?: string;
  

    @IsEnum(Gender, { message: 'Gender must be one of the defined enum values.' })
    gender?: Gender;

    @IsString()
    googleId?: string;
  // static fullname: string;
}
