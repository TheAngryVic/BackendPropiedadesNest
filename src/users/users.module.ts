import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService],
  imports:[ TypeOrmModule.forFeature([Usuarios]),
  
  ]
})
export class UsersModule {}
