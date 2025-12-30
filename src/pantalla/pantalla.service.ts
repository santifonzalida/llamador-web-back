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
    return this.llamables.slice().sort((a, b) => a.timestamp - b.timestamp);
  }

  llamarPersona(payload: Llamable): any {
    return (this.llamables = [payload]);
  }
}
