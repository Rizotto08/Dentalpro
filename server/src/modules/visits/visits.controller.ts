import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVisitDto, UpdateVisitDto } from './dto';
import { VisitsService } from './visits.service';

@UseGuards(JwtAuthGuard)
@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get()
  findAll() {
    return this.visitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateVisitDto) {
    return this.visitsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVisitDto) {
    return this.visitsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitsService.remove(id);
  }
}
