import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  
  @Post()
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestsService.createMany(createInterestDto);
  }

  
  @Get()
  findAll() {
    return this.interestsService.findAll();
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const interest = await this.interestsService.findOne(+id);
    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }
    return interest;
  }

  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterestDto: UpdateInterestDto,
  ) {
    return this.interestsService.update(+id, updateInterestDto);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestsService.remove(+id);
  }
}
