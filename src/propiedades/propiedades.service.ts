import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { Propiedade } from './entities/propiedade.entity';

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

  findAll() {
    return `This action returns all propiedades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propiedade`;
  }

  update(id: number, updatePropiedadeDto: UpdatePropiedadeDto) {
    return `This action updates a #${id} propiedade`;
  }

  remove(id: number) {
    return `This action removes a #${id} propiedade`;
  }

  private handleExceptions(error:any){
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }
    this.logger.error(error);
    throw new InternalServerErrorException("Error inesperado, mira la consola para ver el log")
  }

}
