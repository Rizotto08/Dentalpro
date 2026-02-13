import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const [totalPatients, upcomingVisitsToday, revenueResult] = await Promise.all([
      this.prisma.patient.count(),
      this.prisma.visit.count({ where: { visitDate: { gte: start, lte: end } } }),
      this.prisma.visit.aggregate({
        where: { visitDate: { gte: start, lte: end }, status: { not: 'cancelled' } },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalPatients,
      upcomingVisitsToday,
      revenueToday: Number(revenueResult._sum.amount || new Prisma.Decimal(0)),
    };
  }
}
