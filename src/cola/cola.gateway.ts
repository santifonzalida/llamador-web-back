import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QueueService } from './cola.service';
import { AgregarPersonaDto } from './dto/agregar-persona';

@WebSocketGateway({
  namespace: '/cola',
  cors: { origin: true, credentials: true },
})
export class QueueGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly queueService: QueueService) {}

  handleConnection(client: Socket) {
    // when client connects, send current queue
    console.log('Usuario conectado');
    client.emit('queue:update', this.queueService.getQueue());
  }

  @SubscribeMessage('person:add')
  handleAdd(client: Socket, payload: AgregarPersonaDto) {
    const person = this.queueService.addPerson(payload.name);
    // broadcast
    this.server.emit('person:added', person);
    this.server.emit('queue:update', this.queueService.getQueue());
    return { status: 'ok' };
  }

  @SubscribeMessage('person:call')
  handleCall(client: Socket, payload: { id: string }) {
    const person = this.queueService.callPerson(payload.id);
    if (person) {
      this.server.emit('person:called', person);
      this.server.emit('queue:update', this.queueService.getQueue());
    }
    return { status: 'ok' };
  }

  @SubscribeMessage('person:next')
  handleNext(client: Socket) {
    const next = this.queueService.popNext();
    if (next) {
      this.server.emit('person:called', next);
      this.server.emit('queue:update', this.queueService.getQueue());
    }
    return { status: 'ok' };
  }
}
