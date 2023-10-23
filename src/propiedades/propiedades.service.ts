import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryBuilder, Repository } from 'typeorm';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { FilterPropiedades } from './dto/filterPropiedades.dto';
import { Propiedades } from './entities/propiedade.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ComunaService } from '../comuna/comuna.service';
import { Comuna } from '../comuna/entities/comuna.entity';
import { PropiedadImage } from './entities/propiedade-images.entity';

import {PutObjectCommand, GetObjectCommand,S3Client} from '@aws-sdk/client-s3';

// const FirebaseStorage = require('multer-firebase-storage')
// const firebaseConfig = {
//   apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTHDOMAIN,
//   projectId: process.env.PROJECTID,
//   storageBucket: "gs://nestjspropiedades.appspot.com",
//   messagingSenderId: process.env.MESSAGINGSENDERID,
//   appId: process.env.APPID
// };
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);





@Injectable()
export class PropiedadesService {

  private readonly s3Client = new S3Client({
    region:process.env.AWS_S3_REGION,
    credentials:{
      accessKeyId:process.env.AWS_ACCESS_KEY,
      secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    }
  })

  private readonly logger = new Logger('PropiedadesService');

  constructor(
    @InjectRepository(Propiedades)
    private readonly propiedadesRepository: Repository<Propiedades>,
    @InjectRepository(PropiedadImage)
    private readonly imagesRepository: Repository<PropiedadImage>,
  
    private readonly comunaService:ComunaService,
    private readonly dataSource: DataSource,
    
  ) { }


  async subirImagenes(id: string, file: Array<Express.Multer.File>){

    const propiedad =  await this.findOne(id)

    if (!propiedad) {
      this.handleNotFound('No encontrado')
    }

    let arrayCreados:any[] = []
    console.log(file);
    for (const [index, img] of file.entries()) {
      console.log(img);      
      let key =  `${propiedad.id}/${propiedad.id}-${index}`
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: "nestjs-propiedades",
          Key:key,
          Body:img.buffer
        })
      )
      let url = `https://nestjs-propiedades.s3.sa-east-1.amazonaws.com/${key}`

       let imagen= await this.imagesRepository.save({
        url,
        propiedad:propiedad
      })
      arrayCreados.push(imagen)
    }
      return arrayCreados
  }

  async getAllImg(idparam){
    let imagenes:PropiedadImage[] =
    
    await this.dataSource
    .getRepository(PropiedadImage)
    .createQueryBuilder("img")
    .where("img.propiedadId = :id",{id:idparam})
    .getMany()  

    return imagenes
  }

  async create(createPropiedadeDto: CreatePropiedadeDto) {
    try {
    //  const {comuna, ...body}=createPropiedadeDto
     const {images=[],comuna, ...body}=createPropiedadeDto

     const oneCom = await this.comunaService.findOne(comuna)

      const propiedad = await this.propiedadesRepository.create({
        ...body,
        comuna:oneCom,
        // images:images.map(image=> this.imagesRepository.create({url:image}))
      })


      // await this.propiedadesRepository.create(propiedad)
      await this.propiedadesRepository.save(propiedad);

      return {...propiedad};
      // return {...propiedad, images};
   
    
    
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


  async filter(filterDto: FilterPropiedades){

    console.log(filterDto);

    const {comuna,precio,tipo,tipoOperacion,uf} = filterDto;

    const query = this.propiedadesRepository.createQueryBuilder('propiedad')

    query.leftJoinAndSelect('propiedad.images', 'images');
    query.leftJoinAndSelect('propiedad.comuna', 'comuna');
    if (comuna) {
      query.andWhere('propiedad.comuna LIKE :comuna', { comuna: `%${comuna}%` });
      
    }
    if (precio) {
      query.andWhere('propiedad.precio LIKE :precio', { precio: `%${precio}%` });
    }
    if (tipo) {
      query.andWhere('propiedad.tipo LIKE :tipo', { tipo: `%${tipo}%` });
    }
    if (tipoOperacion) {
      query.andWhere('propiedad.tipoOperacion LIKE :tipoOperacion', { tipoOperacion: `%${tipoOperacion}%` });
    }
    if (uf) {
      query.andWhere('propiedad.uf LIKE :uf', { uf: `%${uf}%` });
    }
   
   let response = await query.getMany()
    console.log(response);

    return await response
  }


  async findOne(term: string) {

    let propiedad:Propiedades;

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
      console.log(propiedad);
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
      
      // if (images) {
      //   await queryRuner.manager.delete(PropiedadImage,{propiedad:{id}})
        
      //   propiedad.images= images.map(
      //     image=>this.imagesRepository.create({url:image})
      //   )
      // }

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
