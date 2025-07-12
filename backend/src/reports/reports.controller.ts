import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async createReport(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.createReport(createReportDto);
  }

  @Get()
  async getAllReports() {
    return this.reportsService.getAllReports();
  }

  @Get(':id')
  async getReportById(@Param('id') id: string) {
    return this.reportsService.getReportById(+id);
  }

  @Delete(':id')
  async deleteReport(@Param('id') id: string) {
    return this.reportsService.deleteReport(+id);
  }
}