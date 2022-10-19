import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport"
import {JwtService} from "@nestjs/jwt"
import { User } from 'src/user/entities/user.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
@ApiTags('Login')
@ApiSecurity('JWT-auth')
export class AuthController {
  constructor (
    private jwtService: JwtService
  ){}


  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req, @Body() logindto: LoginDto){
    const user : User = req.user;
    const payload = {
       userId: user.id,
       firstName : user.firstName,
       lastName: user.lastName,
       email : user.email,
       role: user.role,
    };
    return {token : this.jwtService.sign(payload)};
  }

 
}
