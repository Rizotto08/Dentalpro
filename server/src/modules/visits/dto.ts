import { IsDateString, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  patientId!: string;

  @IsDateString()
  visitDate!: string;

  @IsString()
  treatment!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNumberString()
  amount!: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateVisitDto {
  @IsOptional()
  @IsDateString()
  visitDate?: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumberString()
  amount?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
