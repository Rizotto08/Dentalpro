import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/prisma.service';

describe('DentalPro E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let patientId: string;
  let visitId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    prisma = moduleFixture.get(PrismaService);
    await prisma.visit.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.user.deleteMany();
  });

  it('signup/login', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send({
      email: 'admin@dentalpro.test',
      name: 'Admin',
      password: 'secret123',
    }).expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@dentalpro.test', password: 'secret123' })
      .expect(201);

    token = response.body.accessToken;
    expect(token).toBeDefined();
  });

  it('patients flow', async () => {
    const created = await request(app.getHttpServer())
      .post('/patients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        phone: '12345',
      })
      .expect(201);

    patientId = created.body.id;

    await request(app.getHttpServer())
      .get('/patients')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('visits flow', async () => {
    const created = await request(app.getHttpServer())
      .post('/visits')
      .set('Authorization', `Bearer ${token}`)
      .send({
        patientId,
        visitDate: new Date().toISOString(),
        treatment: 'Cleaning',
        amount: '150.00',
      })
      .expect(201);

    visitId = created.body.id;

    await request(app.getHttpServer())
      .get(`/visits/${visitId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
