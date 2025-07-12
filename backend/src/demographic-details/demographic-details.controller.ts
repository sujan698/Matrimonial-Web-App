import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemographicDetailsService } from './demographic-details.service';
import { CreateDemographicDetailsDto } from './dto/create-demographic-detail.dto';
import { UpdateDemographicDetailsDto } from './dto/update-demographic-detail.dto';

@Controller('demographic-details')
export class DemographicDetailsController {
  constructor(private readonly demographicDetailsService: DemographicDetailsService) {}

  @Post()
  create(@Body() createDemographicDetailDto: CreateDemographicDetailsDto) {
    return this.demographicDetailsService.create(createDemographicDetailDto);
  }

  @Get()
  findAll() {
    return this.demographicDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demographicDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemographicDetailDto: UpdateDemographicDetailsDto) {
    return this.demographicDetailsService.update(+id, updateDemographicDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demographicDetailsService.remove(+id);
  }
}
