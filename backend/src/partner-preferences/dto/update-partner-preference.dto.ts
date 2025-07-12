
import { DietPreference, EducationLevel, EmploymentStatus, Ethnicity, FamilyClass, FamilyValue, MaritalStatus, Religion, ResidentialStatus } from '@prisma/client';
import { CreatePartnerPreferenceDto } from './create-partner-preference.dto';
import { IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePartnerPreferenceDto  {
    @IsInt()
      userId?: number;
    
      @IsEnum(MaritalStatus)
      maritalStatus?: MaritalStatus;
    
      @IsInt()
      @Type(() => Number)
      ageRange?: number;
    
      @IsEnum(DietPreference)
      dietPreference?: DietPreference;
    
      @IsEnum(Religion)
      religion?: Religion;
    
      @IsEnum(FamilyValue)
      familyValues?: FamilyValue;
    
      @IsEnum(Ethnicity)
      ethnicity?: Ethnicity;
    
      @IsEnum(FamilyClass)
      familyClass?: FamilyClass;
    
      @IsEnum(ResidentialStatus)
      residentialStatus?: ResidentialStatus;
    
      @IsEnum(EmploymentStatus)
      employmentStatus?: EmploymentStatus;
    
      @IsEnum(EducationLevel)
      educationLevel?: EducationLevel;
}
