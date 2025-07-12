import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
    @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  reportedUserId: number; // ID of the user being reported

  @IsString()
  @IsNotEmpty()
  reportContent: string; // The report message
}


