import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { Propiedade } from './entities/propiedade.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class PropiedadesService {

  private readonly logger = new Logger('PropiedadesService');

  constructor(
    @InjectRepository(Propiedade)
    private readonly propiedadesRepository: Repository<Propiedade>
  ) { }

  async create(createPropiedadeDto: CreatePropiedadeDto) {
    try {
      const propiedades = await this.propiedadesRepository.create(createPropiedadeDto);
      await this.propiedadesRepository.save(propiedades);
      return propiedades;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto; 
    const popiedad = await this.propiedadesRepository.find({
      take:limit,
      skip:offset
    })

    return popiedad;
  }

  async findOne(term: string) {

    let propiedad:Propiedade;

    if (isUUID(term)) {
      propiedad = await this.propiedadesRepository.findOneBy({id:term})
    }
    else{

      const queryBuilder = this.propiedadesRepository.createQueryBuilder();
      propiedad = await queryBuilder.where(`lower(direccion) =:direccion`,{
        direccion:term.toLowerCase(),
      }).getOne()
    }

    if (propiedad === null) {
      this.handleNotFound(term)
    }
    else{

      return propiedad;
    }

  }

  async update(id: string, updatePropiedadeDto: UpdatePropiedadeDto) {

    const propiedad = await this.propiedadesRepository.preload({
      id:id,
      ...updatePropiedadeDto
    });
    if (!propiedad) this.handleNotFound(id);

    try {
      await this.propiedadesRepository.save(propiedad)
    } catch (error) {
      this.handleExceptions(error)
    }
    return propiedad;
  }

  async remove(id: string) {

    const propiedad = await this.propiedadesRepository.delete(id)
    console.log(propiedad);
    if (propiedad.affected > 0 ) {
      return `${id} has removed`;
    }
    else{
      this.handleNotFound(id)
    }
  }


  private handleNotFound(id){
    throw new NotFoundException(`No se ha encontrado un registro con id ${id}`)
  }


  private handleExceptions(error:any){
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }
    this.logger.error(error);
    throw new InternalServerErrorException("Error inesperado, mira la consola para ver el log")
  }

}
