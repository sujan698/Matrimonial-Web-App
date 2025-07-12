import { IsBase64, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUploadPhotoDto {
   @IsNotEmpty()
    @IsBase64()
     image_url: string;

     
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  
}
