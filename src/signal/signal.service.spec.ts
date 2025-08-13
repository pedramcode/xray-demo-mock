import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SignalService } from './signal.service';
import { RabbitService } from 'src/rabbit/rabbit.service';
import SignalCreateDTO from './dto/signalCreate.dto';

describe('SignalService', () => {
  let service: SignalService;
  let deviceModel: {
    find: jest.Mock<any, any>;
    create: jest.Mock<any, any>;
    updateOne: jest.Mock<any, any>;
  };
  let deviceDataModel: {
    create: jest.Mock<any, any>;
  };
  let rabbitService: {
    consume: jest.Mock<any, any>;
  };

  beforeEach(async () => {
    deviceModel = {
      find: jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue([]) }),
      create: jest
        .fn()
        .mockResolvedValue({ _id: 'deviceId', deviceId: 'deviceId' }),
      updateOne: jest.fn().mockResolvedValue({}),
    };
    deviceDataModel = {
      create: jest.fn().mockResolvedValue({}),
    };
    rabbitService = {
      consume: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalService,
        { provide: getModelToken('Device'), useValue: deviceModel },
        { provide: getModelToken('DeviceData'), useValue: deviceDataModel },
        { provide: RabbitService, useValue: rabbitService },
      ],
    }).compile();

    service = module.get<SignalService>(SignalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should call deviceModel.find and populate', async () => {
      await service.getAll();
      expect(deviceModel.find).toHaveBeenCalled();
      expect(
        (deviceModel.find() as { populate: jest.Mock<any, any> }).populate,
      ).toHaveBeenCalledWith('data');
    });
  });

  describe('create', () => {
    it('should create device and deviceData, then update device', async () => {
      const dto: SignalCreateDTO = {
        deviceId: 'deviceId',
        deviceName: 'Test Device',
        desc: 'desc',
        data: [{ time: 123, x: 1, y: 2, speed: 3 }],
      };
      await service.create(dto);
      expect(deviceModel.create).toHaveBeenCalledWith({
        deviceId: dto.deviceId,
        name: dto.deviceName,
        desc: dto.desc,
      });
      expect(deviceDataModel.create).toHaveBeenCalledWith({
        device: 'deviceId',
        speed: 3,
        time: 123,
        x: 1,
        y: 2,
      });
      expect(deviceModel.updateOne).toHaveBeenCalledWith(
        { deviceId: dto.deviceId },
        { data: [{}] },
      );
    });
  });

  describe('onModuleInit', () => {
    it('should call rabbitService.consume', async () => {
      await service.onModuleInit();
      expect(rabbitService.consume).toHaveBeenCalled();
    });
  });
});
