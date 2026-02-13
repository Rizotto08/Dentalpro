import { Test } from '@nestjs/testing';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';

describe('VisitsController', () => {
  let controller: VisitsController;

  const visitsService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({ id: '1' }),
    create: jest.fn().mockResolvedValue({ id: '1' }),
    update: jest.fn().mockResolvedValue({ id: '1' }),
    remove: jest.fn().mockResolvedValue({ message: 'Visit deleted' }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [VisitsController],
      providers: [{ provide: VisitsService, useValue: visitsService }],
    }).compile();

    controller = moduleRef.get(VisitsController);
  });

  it('findAll', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
  });
});
