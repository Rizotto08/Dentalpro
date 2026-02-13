import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.patient.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id }, include: { visits: true } });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  create(dto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: { ...dto, dateOfBirth: new Date(dto.dateOfBirth) },
    });
  }

  async update(id: string, dto: UpdatePatientDto) {
    await this.findOne(id);
    return this.prisma.patient.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.dateOfBirth ? { dateOfBirth: new Date(dto.dateOfBirth) } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.patient.delete({ where: { id } });
    return { message: 'Patient deleted' };
  }
}
