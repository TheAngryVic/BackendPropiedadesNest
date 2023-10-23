import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsArray, isBoolean, IsBoolean } from 'class-validator';

export class CreateUserDto {



    @IsString()
    @MinLength(1)
    Username:string;

    @IsString()
    @MinLength(1)
    Password:string;
  


  

}
