import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService
import { Report } from '@prisma/client'; // Import the Prisma-generated Report type
import { CreateReportDto } from './dto/create-report.dto'; // Import the DTO

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async createReport(createReportDto: CreateReportDto): Promise<Report> {
    const { userId, reportedUserId, reportContent } = createReportDto;
    const reporter = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const reportedUser = await this.prisma.user.findUnique({
      where: { id: reportedUserId },
    });

    if (!reporter) {
      throw new NotFoundException(`Reporter with ID ${userId} not found.`);
    }
    if (!reportedUser) {
      throw new NotFoundException(
        `Reported user with ID ${reportedUserId} not found.`,
      );
    }
    const report = await this.prisma.report.create({
      data: {
        userId,
        reportedUserId,
        reportContent,
      },
    });

    return report;
  }
  async getAllReports(): Promise<Report[]> {
    return this.prisma.report.findMany({
      include: {
        user: true,
        reportedUser: true,
      },
    });
  }
  async getReportById(id: number): Promise<Report> {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        user: true,
        reportedUser: true,
      },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found.`);
    }

    return report;
  }
  async deleteReport(id: number): Promise<Report> {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found.`);
    }

    return this.prisma.report.delete({
      where: { id },
    });
  }
}
