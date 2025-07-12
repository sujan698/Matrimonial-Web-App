import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { UsersService } from 'src/users/users.service';


@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService,GoogleStrategy,UsersService] ,
  imports:[
    JwtModule.register({
      global:true,
      secret:process.env.SECRET_KEY,
      signOptions:{expiresIn:process.env.EXPIRES_IN,},
    }),
  ],
})
export class AuthModule {}
