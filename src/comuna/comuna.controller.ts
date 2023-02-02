import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ComunaService } from './comuna.service';
import { CreateComunaDto } from './dto/create-comuna.dto';

@Controller('comuna')
export class ComunaController {
  constructor(private readonly comunaService: ComunaService) {}

  @Post("seed")
  feelComuna( ) {
    return this.comunaService.feelComunas();
  }
  @Post()
  create(@Body() comunaDto:CreateComunaDto) {
    return this.comunaService.create(comunaDto);
  }
  @Get()
  findAll() {
    return this.comunaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.comunaService.findOne(id);
  }

}
