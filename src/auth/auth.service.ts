import { Injectable,UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {



    
    constructor(
        private usersService:UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username:string, pass:string): Promise<any>{
        console.log('llego');
        debugger

        const user:any = await this.usersService.findOne( username)
        // console.log('///', user, '///');
        if (!user) {
            // no existe usuario
            throw new UnauthorizedException("No existe ese usuario")
        }
        
        if (bcrypt.compareSync(pass, user.Password)) {
            throw new UnauthorizedException("Password incorrecta")
            
        }
        let {Password, ...resto}= user; 

        // Aca va la logica del token

        const payload = {sub:resto.Id, username:resto.Username}
        return {
            code:200,
            message:'Login exitoso',
            Data:resto,
            token: await this.jwtService.signAsync(payload)
        }
    }
}

