import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('Received data:', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
 async findAll(@Req()request:Request,@Res()response:Response):Promise<any> {
    try{
      const users = await this.usersService.findAll();
      return response.status(200).json({
        status:'Ok',
        message:'Successfully fetch data',
        users:users
      });
    }catch(err){
      return response.status(500).json({
        status:'Error',
        message:'Failed to fetch data',
        error:err
        });
    }
 }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
