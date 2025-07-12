import { IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import {
  MaritalStatus,
  DietPreference,
  Religion,
  FamilyValue,
  Ethnicity,
  FamilyClass,
  ResidentialStatus,
  EmploymentStatus,
  EducationLevel,
} from  '@prisma/client'

export class CreatePartnerPreferenceDto {
  @IsInt()
  userId: number;

  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @IsInt()
  @Type(() => Number)
  ageRange: number;

  @IsEnum(DietPreference)
  dietPreference: DietPreference;

  @IsEnum(Religion)
  religion: Religion;

  @IsEnum(FamilyValue)
  familyValues: FamilyValue;

  @IsEnum(Ethnicity)
  ethnicity: Ethnicity;

  @IsEnum(FamilyClass)
  familyClass: FamilyClass;

  @IsEnum(ResidentialStatus)
  residentialStatus: ResidentialStatus;

  @IsEnum(EmploymentStatus)
  employmentStatus: EmploymentStatus;

  @IsEnum(EducationLevel)
  educationLevel: EducationLevel;
}

