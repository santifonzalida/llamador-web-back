import { Module } from '@nestjs/common';
import { PuestosAtencionModule } from './puestosAtencion/puestosAtencion.module';
import { PantallaModule } from './pantalla/pantalla.module';

@Module({
  imports: [PuestosAtencionModule, PantallaModule],
})
export class AppModule {}
