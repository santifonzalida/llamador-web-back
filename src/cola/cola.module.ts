import { Module } from '@nestjs/common';
import { QueueGateway } from './cola.gateway';
import { QueueService } from './cola.service';

@Module({
  providers: [QueueGateway, QueueService],
  exports: [QueueService],
})
export class ColaModule {}
