import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Propiedade {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    title:string;

    @Column('text',{unique:true})
    direccion:string;
  
    @Column('int',{})
    precio:number;

    @Column('float',{ default:0})
    uf?:number;

    @Column('text',{array:true})
    tipo:string[];


    @Column('float',{ default:0})
    metros?:number;

    @Column('int',{ default:0})
    banios?:number;

    @Column('int',{ default:0})
    dormitorios?:number;

    @Column('text')
    descripcion:string;

    //Ubicacion


    //fotos

}
