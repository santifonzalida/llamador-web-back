import { Module } from '@nestjs/common';
import { PantallaGateway } from './pantalla.gateway';
import { PantallaService } from './pantalla.service';

@Module({
  providers: [PantallaGateway, PantallaService],
  exports: [PantallaService],
})
export class PantallaModule {}
