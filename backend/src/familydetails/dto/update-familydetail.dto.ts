import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilydetailDto } from './create-familydetail.dto';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Ethnicity, FamilyClass, FamilyValue, Religion } from '@prisma/client';

export class UpdateFamilydetailDto {
    @IsInt()
      userId?: number;
    
      @IsEnum(Ethnicity)
      ethnicity?: Ethnicity;
    
      @IsEnum(FamilyValue)
      familyValues?: FamilyValue;
    
      @IsEnum(FamilyClass)
      familyClass?: FamilyClass;
    
      @IsEnum(Religion)
      religion?: Religion;
    
      @IsString()
      gotra?: string;
}
