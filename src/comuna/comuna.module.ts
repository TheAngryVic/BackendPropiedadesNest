import { Module } from '@nestjs/common';
import { ComunaService } from './comuna.service';
import { ComunaController } from './comuna.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comuna } from './entities/comuna.entity';
import { PropiedadesModule } from 'src/propiedades/propiedades.module';

@Module({
  controllers: [ComunaController],
  providers: [ComunaService],
  imports:[    
    TypeOrmModule.forFeature([Comuna]),
  ],
  exports:[ComunaService]
})
export class ComunaModule {}
