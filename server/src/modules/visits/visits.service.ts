import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateVisitDto, UpdateVisitDto } from './dto';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.visit.findMany({ include: { patient: true }, orderBy: { visitDate: 'asc' } });
  }

  async findOne(id: string) {
    const visit = await this.prisma.visit.findUnique({ where: { id }, include: { patient: true } });
    if (!visit) throw new NotFoundException('Visit not found');
    return visit;
  }

  async create(dto: CreateVisitDto) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Patient not found');
    return this.prisma.visit.create({
      data: {
        ...dto,
        visitDate: new Date(dto.visitDate),
        amount: dto.amount,
      },
    });
  }

  async update(id: string, dto: UpdateVisitDto) {
    await this.findOne(id);
    return this.prisma.visit.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.visitDate ? { visitDate: new Date(dto.visitDate) } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.visit.delete({ where: { id } });
    return { message: 'Visit deleted' };
  }
}
