import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { PropiedadesService } from './propiedades.service';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/files/helpers/fileFilter';
import { FilterPropiedades } from './dto/filterPropiedades.dto';
import { AuthGuard } from 'src/auth/auth.guard';



@Controller('propiedades')
export class PropiedadesController {

  

  constructor(private readonly propiedadesService: PropiedadesService) {
  
  
  }
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPropiedadeDto: CreatePropiedadeDto) {
    return this.propiedadesService.create(createPropiedadeDto);
  }
  
  @UseGuards(AuthGuard)
  @Post('foto/:id')
  @UseInterceptors( FilesInterceptor('files',10,{
    fileFilter:fileFilter
  }))
  uploadFile( 
    @UploadedFiles() files : Array<Express.Multer.File>,
    @Param('id',ParseUUIDPipe) id : string,
    
    ){
      if (!files) {
        throw new BadRequestException("Al menos un archivo es necesario ")
      }

      console.log(files);
      return  this.propiedadesService.subirImagenes(id, files)
    }

  @Get('fotoGetAll/:id')
  findImagesP(@Param('id') id: string) {
    return this.propiedadesService.getAllImg(id);
  }
  
  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.propiedadesService.findAll(paginationDto);
  }
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.propiedadesService.findOne(term);
  }

  @Post('/filter')
  async filter(@Body() fileFilter: FilterPropiedades){
    console.log(await this.propiedadesService.filter(fileFilter));
    return this.propiedadesService.filter(fileFilter);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updatePropiedadeDto: UpdatePropiedadeDto) {
    return this.propiedadesService.update(id, updatePropiedadeDto);
  }
  

  @UseGuards(AuthGuard)
  @Delete(':term')
  remove(@Param('term',ParseUUIDPipe) term: string) {
    return this.propiedadesService.remove(term);
  }
}
