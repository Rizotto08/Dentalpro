import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PatientsModule } from './modules/patients/patients.module';
import { VisitsModule } from './modules/visits/visits.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PatientsModule,
    VisitsModule,
    DashboardModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
