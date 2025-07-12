import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamilyDetailsService } from './familydetails.service';
import { CreateFamilydetailDto } from './dto/create-familydetail.dto';
import { UpdateFamilydetailDto } from './dto/update-familydetail.dto';

@Controller('familydetails')
export class FamilydetailsController {
  constructor(private readonly familydetailsService: FamilyDetailsService) {}

  @Post()
  create(@Body() createFamilydetailDto: CreateFamilydetailDto) {
    return this.familydetailsService.create(createFamilydetailDto);
  }

  @Get()
  findAll() {
    return this.familydetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familydetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilydetailDto: UpdateFamilydetailDto) {
    return this.familydetailsService.update(+id, updateFamilydetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familydetailsService.remove(+id);
  }
}
