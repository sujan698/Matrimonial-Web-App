import { Controller, Get, Param } from '@nestjs/common';
import { ProvinceService } from './provinces.service';


@Controller('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  async getProvinces() {
    return this.provinceService.getProvinces();
  }

  @Get(':provinceId/districts')
  async getDistricts(@Param('provinceId') provinceId: string) {
    return this.provinceService.getDistrictsByProvince(provinceId);
  }
}



// import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { ProvincesService } from './provinces.service';

// @Controller('provinces')
// export class ProvincesController {
//   constructor(private readonly provinceService: ProvincesService) {}

//   @Get()
//   async getAllProvinces() {
//     return this.provinceService.getAllProvinces();
//   }
//   @Get(':id')
//     async getProvinceById(@Param('id', ParseIntPipe) id: number) {
//       return this.provinceService.findOne(Number(id));
//     }
// }
