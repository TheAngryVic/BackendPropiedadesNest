import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsArray } from 'class-validator';

export class CreatePropiedadeDto {



    @IsString()
    @MinLength(1)
    title:string;

    @IsString()
    @MinLength(1)
    direccion:string;
  
    @IsNumber()
    @IsPositive()
    precio:number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    uf?:number;

    @IsString({each:true})
    @IsArray()
    tipo:string[];


    @IsNumber()
    @IsPositive()
    @IsOptional()
    metros?:number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    banios?:number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    dormitorios?:number;

    @IsString()
    @MinLength(1)
    descripcion:string;


}
