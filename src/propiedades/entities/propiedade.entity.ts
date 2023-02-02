import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { PropiedadImage } from "./propiedade-images.entity";
import { Comuna } from '../../comuna/entities/comuna.entity';
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
    @ManyToOne(()=> Comuna, (comuna)=>{comuna})
    comuna:Comuna;

    //fotos

    @OneToMany(
        ()=> PropiedadImage,
        (propiedadImage)=>propiedadImage.propiedad,
        {cascade: true, eager: true}
    )
    images?:PropiedadImage[];
    
}
