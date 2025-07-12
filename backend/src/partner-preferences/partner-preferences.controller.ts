import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerPreferencesService } from './partner-preferences.service';
import { CreatePartnerPreferenceDto } from './dto/create-partner-preference.dto';
import { UpdatePartnerPreferenceDto } from './dto/update-partner-preference.dto';

@Controller('partner-preferences')
export class PartnerPreferencesController {
  constructor(private readonly partnerPreferencesService: PartnerPreferencesService) {}

  @Post()
  create(@Body() createPartnerPreferenceDto: CreatePartnerPreferenceDto) {
    return this.partnerPreferencesService.create(createPartnerPreferenceDto);
  }

  @Get()
  findAll() {
    return this.partnerPreferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerPreferencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerPreferenceDto: UpdatePartnerPreferenceDto) {
    return this.partnerPreferencesService.update(+id, updatePartnerPreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerPreferencesService.remove(+id);
  }
}
