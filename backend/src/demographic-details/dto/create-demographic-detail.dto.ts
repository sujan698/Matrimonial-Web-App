import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MaritalStatus, ResidentialStatus, EducationLevel, EmploymentStatus, DietPreference, MotherTongue } from '@prisma/client';

export class CreateDemographicDetailsDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @IsEnum(ResidentialStatus)
  @IsNotEmpty()
  residentialStatus: ResidentialStatus;

  @IsInt()
  @IsNotEmpty()
  districtId: number;

  @IsInt()
  @IsNotEmpty()
  provinceId: number;

  @IsEnum(EducationLevel)
  @IsNotEmpty()
  educationLevel: EducationLevel;

  @IsEnum(EmploymentStatus)
  @IsNotEmpty()
  employmentStatus: EmploymentStatus;

  @IsEnum(DietPreference)
  @IsNotEmpty()
  dietPreference: DietPreference;

  @IsNotEmpty()
  @IsString()
  height: string;

  @IsString()
  @IsNotEmpty()
  incomeRange: string;

  @IsEnum(MotherTongue)
  @IsNotEmpty()
  motherTongue: MotherTongue;
}
