import { Get, Injectable, Param, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/user.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
export type User = any;

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Usuarios)
        private readonly userRepository: Repository<Usuarios>,
    ) { }

    async findOne(term: string) {

        let usuario: Usuarios;
        // console.log(term);
        const queryBuilder = this.userRepository.createQueryBuilder();
        usuario = await queryBuilder.where(`lower(Username) =:Username`, {
            Username: term.toLowerCase(),
        }).getOne()

        if (usuario === null) {
            console.log('error');
            return {
                code: 404,
                message:'No encontrado'
            }
        }
        else {
            console.log(usuario);
            return usuario;
        }

    }
    async create({Username, Password}: CreateUserDto) {


      let res:any =await  this.findOne(Username)

      if (res.code !== 404) {
        throw new BadRequestException("Username already exists")
      }
      try {
        //  const {comuna, ...body}=createPropiedadeDto
         
    
      
    
          const user = await this.userRepository.create({
            Username,
            Password: bcrypt.hashSync(Password, 12),
            
          })    
          await this.userRepository.save(user);
    
          return {...user};
         
       
        
        
        } catch (error) {
        //   this.handleExceptions(error)
        console.log(error);
        }
    }

   

}