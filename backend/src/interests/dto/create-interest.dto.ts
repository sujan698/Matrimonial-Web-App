import { Interests } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateInterestDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsEnum(Interests, {each:true})
    @IsNotEmpty()
    interests: Interests[];
}
