import { Body, Controller, Get } from '@nestjs/common';
import { SignalService } from './signal.service';

@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Get('/mock')
  mock() {
    this.signalService.mock();
    return 'Done';
  }
}
