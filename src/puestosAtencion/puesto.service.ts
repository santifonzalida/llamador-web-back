import { Injectable } from '@nestjs/common';
import { PUESTOS_ATENCION } from './puestos.data';

export interface Puesto {
  id: number;
  name: string;
  free: boolean;
  idClient: string;
}

@Injectable()
export class PuestoService {
  private puestos: Puesto[] = PUESTOS_ATENCION;

  getPuestosAtencion(): Puesto[] {
    return this.puestos.sort((a,b) => a.id - b.id);
  }

  addPuestoAtencion(): Puesto {
    const puestosLength = this.puestos.length;
    const puesto: Puesto = {
      id: puestosLength == 0 ? 1 : this.puestos[this.puestos.length - 1].id + 1,
      free: true,
      idClient: '',
      name: `Puesto ${puestosLength == 0 ? 1 : this.puestos[this.puestos.length - 1].id + 1}`,
    };
    this.puestos.push(puesto);
    return puesto;
  }

  deletePuestoAtencion(idPuesto: number): number {
    let codigoRespuesta = 404;
    const indexPuesto = this.puestos.findIndex((p) => p.id == idPuesto);
    if (indexPuesto > -1) {
      if (this.puestos[indexPuesto].free) {
        this.puestos.splice(indexPuesto, 1);
        codigoRespuesta = 200;
      }
    }
    return codigoRespuesta;
  }

  ocuparPuestoAtencion(idPuesto: number, idClient: string) {
    this.puestos.forEach((puesto: Puesto) => {
      if (puesto.id == idPuesto) {
        puesto.free = false;
        puesto.idClient = idClient;
      }
    });
  }

  liberarPuestoAtencion(idPuesto: number) {
    this.puestos.forEach((puesto: Puesto) => {
      if (puesto.id == idPuesto) {
        puesto.free = true;
        puesto.idClient = '';
      }
    });
  }

  eliminarPuestoAtencion(idPuesto: number) {
    const puestoIndex = this.puestos.findIndex((p) => p.id == idPuesto);
    if (puestoIndex > -1) {
      this.puestos.splice(puestoIndex, 1);
      return;
    }
  }

  clienteDesconectado(idClienteDesconectado: string): any {
    const resp: any = {};
    const indexClientePuesto = this.puestos.findIndex(
      (p: Puesto) => p.idClient == idClienteDesconectado,
    );

    if (indexClientePuesto > -1) {
      this.puestos[indexClientePuesto].idClient = '';
      this.puestos[indexClientePuesto].free = true;
      resp.mensaje = `El cliente libero el puesto: ${this.puestos[indexClientePuesto].name}`;
      resp.codigo = 200;
    } else {
      resp.mensaje =
        'El cliente no tenia un puesto asignado. Desconectado correctamente';
      resp.codigo = 201;
    }

    return resp;
  }
}
