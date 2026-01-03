import { Injectable } from '@nestjs/common';

export interface Llamable {
  id: number;
  persona: string;
  timestamp: number;
  idPuesto: number;
}

@Injectable()
export class PantallaService {
  public llamables: Llamable[] = [];

  getLlamables(): Llamable[] {
    return this.llamables;
  }

  llamarPersona(payload: Llamable): any {
    this.llamables.push(payload);
    return this.llamables.sort((a, b) => b.timestamp - a.timestamp);
  }
}
