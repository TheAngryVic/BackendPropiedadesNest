import { Module } from '@nestjs/common';
import { PropiedadesService } from './propiedades.service';
import { PropiedadesController } from './propiedades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propiedades } from './entities/propiedade.entity';
import { PropiedadImage } from './entities/propiedade-images.entity';
import { ComunaModule } from '../comuna/comuna.module';

@Module({
  controllers: [PropiedadesController],
  providers: [PropiedadesService],
  imports:[
    TypeOrmModule.forFeature([Propiedades,PropiedadImage]),
    ComunaModule
  ]
})
export class PropiedadesModule {}
