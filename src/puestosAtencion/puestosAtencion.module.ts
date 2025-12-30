import { Module } from '@nestjs/common';
import { PuestoService } from './puesto.service';
import { PuestoGateway } from './puesto.gateway';

@Module({
  providers: [PuestoService, PuestoGateway],
  exports: [PuestoService],
})
export class PuestosAtencionModule {}
