import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsArray } from 'class-validator';

export class CreateComunaDto {



    @IsString()
    @MinLength(1)
     nombre:string;

    


}
