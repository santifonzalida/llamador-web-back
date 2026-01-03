import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Llamable, PantallaService } from './pantalla.service';

@WebSocketGateway({ cors: { origin: true, credentials: true } })
export class PantallaGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly pantallaService: PantallaService) {}

  handleConnection(client: Socket) {
    // when display connects, send current list
    client.emit('llamable:update', this.pantallaService.getLlamables());
  }

  handleDisconnect() {
    console.log('Pantalla desconectada');
  }

  @SubscribeMessage('llamable:call')
  handleLlamarPersona(client: Socket, payload: Llamable) {
    const llamables = this.pantallaService.llamarPersona(payload);

    this.server.emit('llamable:called', llamables);
    return { status: 'ok' };
  }
}
