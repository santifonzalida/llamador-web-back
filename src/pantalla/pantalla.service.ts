import { Injectable } from '@nestjs/common';

export interface Llamable {
  id: number;
  persona: string;
  timestamp: number;
  idPuesto: number;
  fueLlamado: boolean;
}

@Injectable()
export class PantallaService {
  public llamables: Llamable[] = [];

  getLlamables(): Llamable[] {
    return this.llamables;
  }

  llamarPersona(payload: Llamable): any {
    payload.id = Date.now();
    this.llamables.push(payload);
    return this.llamables.sort((a, b) => b.timestamp - a.timestamp);
  }
}
