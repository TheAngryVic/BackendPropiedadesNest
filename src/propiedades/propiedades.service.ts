import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryBuilder, Repository } from 'typeorm';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { Propiedade } from './entities/propiedade.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ComunaService } from '../comuna/comuna.service';
import { Comuna } from '../comuna/entities/comuna.entity';
import { PropiedadImage } from './entities/propiedade-images.entity';

@Injectable()
export class PropiedadesService {

  private readonly logger = new Logger('PropiedadesService');

  constructor(
    @InjectRepository(Propiedade)
    private readonly propiedadesRepository: Repository<Propiedade>,
    @InjectRepository(PropiedadImage)
    private readonly imagesRepository: Repository<PropiedadImage>,
    private readonly comunaService:ComunaService,
    private readonly dataSource: DataSource
  ) { }

  async create(createPropiedadeDto: CreatePropiedadeDto) {
    try {
    //  const {comuna, ...body}=createPropiedadeDto
     const {images=[],comuna, ...body}=createPropiedadeDto

     const oneCom = await this.comunaService.findOne(comuna)

      // const propiedad = new Propiedade()
      // propiedad.title = body.title;
      // propiedad.direccion = body.direccion;
      // propiedad.precio = body.precio;
      // propiedad.uf = body.uf;
      // propiedad.tipo = body.tipo;
      // propiedad.metros = body.metros;
      // propiedad.banios = body.banios;
      // propiedad.dormitorios = body.dormitorios;
      // propiedad.descripcion = body.descripcion;
      // propiedad.comuna = oneCom

      const propiedad = await this.propiedadesRepository.create({
        ...body,
        comuna:oneCom,
        images:images.map(image=> this.imagesRepository.create({url:image}))
      })


      // await this.propiedadesRepository.create(propiedad)
      await this.propiedadesRepository.save(propiedad);

      return {...propiedad, images};
   
    
    
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

    const { images, comuna, ...body} = updatePropiedadeDto;

    const comToEdit = await this.comunaService.findOne(comuna);

    console.log(comToEdit);

    const propiedad = await this.propiedadesRepository.preload({
      id: id,
      ...body,
      comuna:comToEdit
      
    })

    if (!propiedad) this.handleNotFound(id);
   
    const queryRuner = this.dataSource.createQueryRunner(); 
    await queryRuner.connect();
    await queryRuner.startTransaction();

    try {
      
      if (images) {
        await queryRuner.manager.delete(PropiedadImage,{propiedad:{id}})
        
        propiedad.images= images.map(
          image=>this.imagesRepository.create({url:image})
        )
      }

      await queryRuner.manager.save(propiedad);
      await queryRuner.commitTransaction();
      await queryRuner.release();

      return propiedad;

    } catch (error) {
      await queryRuner.rollbackTransaction();
      this.handleExceptions(error)
    }
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
