import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PuestoService } from './puesto.service';

@WebSocketGateway({ cors: { origin: true } })
export class PuestoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly puestoService: PuestoService) {}

  handleConnection(client: Socket) {
    client.emit('puesto:update', this.puestoService.getPuestosAtencion());
  }

  handleDisconnect(client: Socket) {
    const respuesta: any = this.puestoService.clienteDesconectado(client.id);
    if (respuesta.codigo === 200) {
      this.server.emit(
        'puesto:update',
        this.puestoService.getPuestosAtencion(),
      );
    }
    console.log(respuesta.mensaje, respuesta.codigo);
  }

  @SubscribeMessage('puesto:add')
  handleAdd() {
    const puesto = this.puestoService.addPuestoAtencion();
    // broadcast
    this.server.emit('puesto:update', this.puestoService.getPuestosAtencion());
    return { status: 'ok' };
  }

  @SubscribeMessage('puesto:delete')
  handleDelete(client: Socket, payload: { id: number }) {
    const respCodigo = this.puestoService.deletePuestoAtencion(payload.id);

    if (respCodigo == 200) {
      this.server.emit(
        'puesto:update',
        this.puestoService.getPuestosAtencion(),
      );
    }
    return { status: 'ok', codigo: respCodigo };
  }

  @SubscribeMessage('puesto:take')
  handleTake(client: Socket, payload: { id: number }) {
    const puesto = this.puestoService.ocuparPuestoAtencion(
      payload.id,
      client.id,
    );
    // broadcast
    this.server.emit('puesto:update', this.puestoService.getPuestosAtencion());
    return { status: 'ok' };
  }

  @SubscribeMessage('puesto:liberate')
  handleLiberate(client: Socket, payload: { id: number }) {
    const puesto = this.puestoService.liberarPuestoAtencion(payload.id);
    // broadcast
    this.server.emit('puesto:update', this.puestoService.getPuestosAtencion());
    return { status: 'ok' };
  }
}
