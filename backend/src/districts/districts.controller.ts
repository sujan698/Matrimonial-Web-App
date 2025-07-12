import { Controller, Get, Param } from '@nestjs/common';
import { DistrictsService } from './districts.service';

@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  // Get all districts
  @Get()
  async getAllDistricts() {
    return this.districtsService.getAllDistricts();
  }

  // Get a specific district by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.districtsService.findOne(Number(id));
  }
}


// import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { DistrictsService } from './districts.service';

// @Controller('districts')
// export class DistrictsController {
//   constructor(private readonly districtService: DistrictsService) {}

//   @Get()
//   async getAllDistricts() {
//     return this.districtService.getAllDistricts();
//   }
//   @Get(':id')
//   async getDistrictById(@Param('id', ParseIntPipe) id: number) {
//     return this.districtService.findOne(Number(id));
//   }
// }
