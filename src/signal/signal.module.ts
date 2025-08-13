import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';

import { RabbitModule } from 'src/rabbit/rabbit.module';

@Module({
  imports: [RabbitModule],
  providers: [SignalService],
  controllers: [SignalController],
})
export class SignalModule {}
