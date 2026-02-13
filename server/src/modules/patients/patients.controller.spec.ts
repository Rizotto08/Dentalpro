import { Test } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

describe('PatientsController', () => {
  let controller: PatientsController;

  const patientsService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({ id: '1' }),
    create: jest.fn().mockResolvedValue({ id: '1' }),
    update: jest.fn().mockResolvedValue({ id: '1' }),
    remove: jest.fn().mockResolvedValue({ message: 'Patient deleted' }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [{ provide: PatientsService, useValue: patientsService }],
    }).compile();

    controller = moduleRef.get(PatientsController);
  });

  it('findAll', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
  });
});
