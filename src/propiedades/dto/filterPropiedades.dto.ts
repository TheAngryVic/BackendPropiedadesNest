import { IsString, MinLength, IsNumber, IsPositive, IsOptional, IsArray, isBoolean, IsBoolean } from 'class-validator';

export class FilterPropiedades {





  
  
    @IsNumber()    
    @IsOptional()
    precio:number;

    @IsNumber()
    @IsOptional()
    uf:number;

    @IsNumber()
    @IsOptional()
    tipo:number;

    @IsNumber()
    @IsOptional()
    tipoOperacion:number;





    @IsString()
    @IsOptional()
    comuna:string;


}
