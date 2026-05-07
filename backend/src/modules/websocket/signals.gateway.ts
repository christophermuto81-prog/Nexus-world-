import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/signals',
})
export class SignalsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SignalsGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe:signals')
  handleSubscribeSignals(client: Socket, payload: { types?: string[] }) {
    const room = payload?.types?.join(',') || 'all';
    client.join(`signals:${room}`);
    return { event: 'subscribed', data: { room } };
  }

  emitNewSignal(signal: any) {
    this.server.to('signals:all').emit('signal:new', signal);
    this.server.to(`signals:${signal.type}`).emit('signal:new', signal);
  }

  emitPriceUpdate(symbol: string, price: number) {
    this.server.emit('price:update', { symbol, price, timestamp: Date.now() });
  }

  emitCommunityEvent(event: any) {
    this.server.emit('community:event', event);
  }
}
