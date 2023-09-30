import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsArray, isBoolean, IsBoolean } from 'class-validator';

export class CreatePropiedadeDto {



    @IsString()
    @MinLength(1)
    title:string;

    @IsString()
    @MinLength(1)
    direccion:string;
  
    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio:number;

    @IsNumber()
    @IsPositive()
    uf:number;

    @IsString()
    mapUrl:string;

    @IsNumber()
    tipo:number;
    @IsNumber()
    tipoOperacion:number;


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

    @IsBoolean()
    estacionamiento:boolean;
    @IsBoolean()
    bodega:boolean;
    @IsBoolean()
    vigilancia:boolean;

    @IsString()
    @MinLength(1)
    comuna:string;

    @IsString({each:true})
    @IsArray()
    @IsOptional()
    images?:string[];

}
