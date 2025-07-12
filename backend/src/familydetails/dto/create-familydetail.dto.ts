import { Ethnicity, FamilyClass, FamilyValue, Religion } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateFamilydetailDto {
    @IsInt()
  userId: number;

  @IsEnum(Ethnicity)
  ethnicity: Ethnicity;

  @IsEnum(FamilyValue)
  familyValues: FamilyValue;

  @IsEnum(FamilyClass)
  familyClass: FamilyClass;

  @IsEnum(Religion)
  religion: Religion;

  @IsString()
  @IsNotEmpty()
  gotra: string;
}
