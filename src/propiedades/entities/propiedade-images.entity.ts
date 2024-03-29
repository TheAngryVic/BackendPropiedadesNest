import { IsString, IsUUID, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Propiedades } from './propiedade.entity';

@Entity({name:'propiedades_images'})
export class PropiedadImage{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsString()
    @Min(1)
    url:string;
    // @IsUUID()
    // @IsString()
    // idPropiedad:string;
    
    @ManyToOne(
        ()=>Propiedades,
        (propiedad)=>propiedad.images
        ,{onDelete:'CASCADE'} 
    )
    @JoinColumn({ name: 'propiedadId' }) 
    propiedad: Propiedades
}