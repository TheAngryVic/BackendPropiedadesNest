import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common/common.module';
import { PropiedadesModule } from './propiedades/propiedades.module';
import { SeedModule } from './seed/seed.module';
import { ComunaModule } from './comuna/comuna.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      

    }),

    CommonModule,
    PropiedadesModule,
    SeedModule,
    ComunaModule
  ],
})
export class AppModule {}
