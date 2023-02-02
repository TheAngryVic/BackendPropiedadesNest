import { IsString, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Propiedade } from './propiedade.entity';

@Entity({name:'propiedades_images'})
export class PropiedadImage{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsString()
    @Min(1)
    url:string;

    @ManyToOne(
        ()=>Propiedade,
        (propiedad)=>propiedad.images
        ,{onDelete:'CASCADE'} 
    )
    propiedad: Propiedade
}