import { IsString, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Propiedades } from '../../propiedades/entities/propiedade.entity';

@Entity({name:'propiedades_images'})
export class PropiedadImage{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsString()
    @Min(1)
    url:string;

    @ManyToOne(
        ()=>Propiedades,
        (propiedad)=>propiedad.images
        ,{onDelete:'CASCADE'} 
    )
    propiedad: Propiedades
}