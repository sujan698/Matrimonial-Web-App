
import { DietPreference, EducationLevel, EmploymentStatus, MaritalStatus, MotherTongue, ResidentialStatus } from '@prisma/client';
import { CreateDemographicDetailsDto } from './create-demographic-detail.dto';
import { IsEnum, IsInt, IsString } from 'class-validator';

export class UpdateDemographicDetailsDto {
  @IsInt()
    userId?: number;
  
    @IsEnum(MaritalStatus)
    maritalStatus?: MaritalStatus;
  
    @IsEnum(ResidentialStatus)
    residentialStatus?: ResidentialStatus;
  
    @IsInt()
    districtId?: number;
  
    @IsInt()
    provinceId?: number;
  
    @IsEnum(EducationLevel)
    educationLevel?: EducationLevel;
  
    @IsEnum(EmploymentStatus)
    employmentStatus?: EmploymentStatus;
  
    @IsEnum(DietPreference)
    dietPreference?: DietPreference;
  
    @IsString()
    height?: string;
  
    @IsString()
    incomeRange?: string;
  
    @IsEnum(MotherTongue)
    motherTongue?: MotherTongue;
}
