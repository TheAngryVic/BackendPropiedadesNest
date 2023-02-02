import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialData } from './data/comunas.data';
import { Comuna } from './entities/comuna.entity';
import { CreateComunaDto } from './dto/create-comuna.dto';


@Injectable()
export class ComunaService {

  constructor(
    @InjectRepository(Comuna)
    private readonly ComunaRepository: Repository<Comuna>,
  ) {}


  async feelComunas( ) {
   
    await this.insertComunas();

    return 'SEED EXECUTED';

  }

  async create(comunaDto:CreateComunaDto ) {
   
    try {
      console.log(comunaDto);

      const comuna = await this.ComunaRepository.create(comunaDto);
      await this.ComunaRepository.save(comuna);

      return comuna
    } catch (error) {
      console.log(error);
    }

    return 'SEED EXECUTED';

  }

  private async insertComunas(){

    //Primero deberias borrar las comunas

    const data = initialData.comunas;
    const insertPromesas=[];

    data.forEach(element => {
      // console.log(element);    
      insertPromesas.push(this.create(element));
    });

    await Promise.all( insertPromesas );
    return true;

  }



  findAll() {
    return `This action returns all comuna`;
  }

  async findOne(id: string) {
   
    const comuna = await this.ComunaRepository.findOneBy({id})

    if (comuna === null) {
      this.handleNotFound(id)
    }
    else{

      return comuna;
    }
  }
 

  remove(id: number) {
    return `This action removes a #${id} comuna`;
  }

  private handleNotFound(id){
    throw new NotFoundException(`No se ha encontrado un registro con id ${id}`)
  }

}
