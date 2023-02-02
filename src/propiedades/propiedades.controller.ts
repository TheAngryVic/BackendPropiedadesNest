import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PropiedadesService } from './propiedades.service';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Query } from '@nestjs/common/decorators';

@Controller('propiedades')
export class PropiedadesController {
  constructor(private readonly propiedadesService: PropiedadesService) {}

  @Post()
  create(@Body() createPropiedadeDto: CreatePropiedadeDto) {
    return this.propiedadesService.create(createPropiedadeDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.propiedadesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.propiedadesService.findOne(term);
  }

   @Patch(':id')
   update(@Param('id',ParseUUIDPipe) id: string, @Body() updatePropiedadeDto: UpdatePropiedadeDto) {
     return this.propiedadesService.update(id, updatePropiedadeDto);
   }
  

  @Delete(':term')
  remove(@Param('term',ParseUUIDPipe) term: string) {
    return this.propiedadesService.remove(term);
  }
}
