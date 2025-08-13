import { Injectable } from '@nestjs/common';
import { RabbitService } from 'src/rabbit/rabbit.service';
import generateMockDevices from './mock/mocker';

@Injectable()
export class SignalService {
  constructor(private readonly rabbitService: RabbitService) {}

  mock() {
    const data = generateMockDevices(3);
    this.rabbitService.publish(JSON.stringify(data));
  }
}
