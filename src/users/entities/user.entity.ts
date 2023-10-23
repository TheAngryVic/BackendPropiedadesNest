import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class Usuarios {

    @PrimaryGeneratedColumn('uuid')
    Id:string;
    
    @Column('varchar',{unique:true})
    Username:string;
    
    @Column('varchar',)
    Password:string;
  
   
    
}
