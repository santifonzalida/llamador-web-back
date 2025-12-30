import { Injectable } from '@nestjs/common';

export interface Person {
  id: string;
  name: string;
  called: boolean;
  timestamp: number;
}

export interface Puesto {
  id: number;
  name: string;
  free: boolean;
  timestamp: number;
}

@Injectable()
export class QueueService {
  private queue: Person[] = [];
  private puestos: Puesto[] = [
    { id: 1, name: 'Puesto 1', free: true, timestamp: Date.now() },
    { id: 2, name: 'Puesto 2', free: true, timestamp: Date.now() },
  ];

  getQueue(): Person[] {
    // return copy sorted by timestamp
    return this.queue.slice().sort((a, b) => a.timestamp - b.timestamp);
  }

  addPerson(name: string): Person {
    const person: Person = {
      id: (Math.random() * 1e9).toFixed(0),
      name,
      called: false,
      timestamp: Date.now(),
    };
    this.queue.push(person);
    return person;
  }

  callPerson(id: string): Person | null {
    const idx = this.queue.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.queue[idx].called = true;
    return this.queue[idx];
  }

  popNext(): Person | null {
    const sorted = this.getQueue().filter((p) => !p.called);
    if (!sorted.length) return null;
    const next = sorted[0];
    this.callPerson(next.id);
    return next;
  }
}
