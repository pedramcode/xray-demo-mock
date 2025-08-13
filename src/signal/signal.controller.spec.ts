import { Test, TestingModule } from '@nestjs/testing';
import { SignalController } from './signal.controller';
import { SignalService } from './signal.service';
import SignalCreateDTO from './dto/signalCreate.dto';

describe('SignalController', () => {
  let controller: SignalController;
  let signalService: SignalService;

  beforeEach(async () => {
    const mockSignalService = {
      create: jest.fn(function (this: void) {}),
      getAll: jest.fn(function (this: void) {}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalController],
      providers: [{ provide: SignalService, useValue: mockSignalService }],
    }).compile();

    controller = module.get<SignalController>(SignalController);
    signalService = module.get<SignalService>(SignalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call signalService.create and return result', async () => {
      const dto: SignalCreateDTO = {
        deviceId: 'deviceId',
        deviceName: 'Test Device',
        desc: 'desc',
        data: [{ time: 123, x: 1, y: 2, speed: 3 }],
      };
      const result = { id: 'deviceId' };
      (signalService.create as jest.Mock).mockResolvedValue(result);

      const response = await controller.create(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(signalService.create).toHaveBeenCalledWith(dto);
      expect(response).toBe(result);
    });
  });

  describe('getAll', () => {
    it('should call signalService.getAll and return result', async () => {
      const result = [{ id: 'deviceId' }];
      (signalService.getAll as jest.Mock).mockResolvedValue(result);

      const response = await controller.getAll();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(signalService.getAll).toHaveBeenCalled();
      expect(response).toBe(result);
    });
  });
});
