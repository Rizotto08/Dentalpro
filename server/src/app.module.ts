import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; // <- импорт
import { AuthModule } from './modules/auth/auth.module';
import { PatientsModule } from './modules/patients/patients.module';
import { VisitsModule } from './modules/visits/visits.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PatientsModule,
    VisitsModule,
    DashboardModule,
    JwtModule.register({}),
  ],
  controllers: [AppController], // <- добавили
  providers: [],
})
export class AppModule {}
