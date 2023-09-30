import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { PropiedadImage } from "./propiedade-images.entity";
import { Comuna } from '../../comuna/entities/comuna.entity';
@Entity()
export class Propiedades {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    title:string;

    @Column('text',{unique:true})
    direccion:string;
  
    @Column('int')
    precio?:number;

    @Column('float')
    uf:number;
    
    @Column('text')
    mapUrl:string;

    // Tipo de propiedad [0 = casa, 1 = depto, 2 = parcela]
    @Column('int')
    tipo:number;
    
    // Tipo de operacion [0 = venta, 1 = arriendo]
    @Column('int')
    tipoOperacion:number;

    @Column('float',{ default:0})
    metros?:number;

    @Column('int',{ default:0})
    banios?:number;

    @Column('boolean')
    estacionamiento:boolean;

    @Column('boolean')
    bodega:boolean;

    @Column('boolean')
    vigilancia:boolean;

    @Column('int',{ default:0})
    dormitorios?:number;

    @Column('text')
    descripcion:string;

    //Ubicacion
    @ManyToOne(()=> Comuna, 
    (comuna)=>{comuna},
    {cascade: true, eager: true}
    )
    comuna:Comuna;

    //fotos

    @OneToMany(
        ()=> PropiedadImage,
        (propiedadImage)=>propiedadImage.propiedad,
        {cascade: true, eager: true}
    )
    images?:PropiedadImage[];
    
}
