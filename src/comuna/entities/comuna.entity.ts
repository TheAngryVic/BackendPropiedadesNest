import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Propiedades } from '../../propiedades/entities/propiedade.entity';

@Entity({name:'Comuna'})
export class Comuna {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column('text',{unique:true})
    nombre:string;

    // @OneToOne(
    //     ()=>Propiedade,
    //     {
    //         cascade: true
    //     }        
    //     )
    // propiedad: Propiedade
   
    
}
