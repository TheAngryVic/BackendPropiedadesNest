import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common/common.module';
import { PropiedadesModule } from './propiedades/propiedades.module';
import { SeedModule } from './seed/seed.module';
import { ComunaModule } from './comuna/comuna.module';
import { FilesModule } from './files/files.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'mysqlpropiedades',
      username: 'mega',
      password: 'K6orJ4??-',
      autoLoadEntities: true,
      // synchronize: true,
      synchronize: false,
      

    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: +process.env.DB_PORT,
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   autoLoadEntities: true,
    //   synchronize: true,
      

    // }),

    CommonModule,
    PropiedadesModule,
    SeedModule,
    ComunaModule,
    FilesModule
  ],
})
export class AppModule {}
