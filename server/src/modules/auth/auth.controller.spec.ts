import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const authService = {
    signup: jest.fn().mockResolvedValue({ accessToken: 'token' }),
    login: jest.fn().mockResolvedValue({ accessToken: 'token' }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = moduleRef.get(AuthController);
  });

  it('signup returns access token', async () => {
    await expect(controller.signup({ email: 'a@b.com', name: 'A', password: 'secret1' })).resolves.toEqual({ accessToken: 'token' });
  });

  it('login returns access token', async () => {
    await expect(controller.login({ email: 'a@b.com', password: 'secret1' })).resolves.toEqual({ accessToken: 'token' });
  });
});
