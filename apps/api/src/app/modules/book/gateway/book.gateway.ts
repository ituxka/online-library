import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BookingService } from '../../booking/booking.service';
import { Client, Server, Socket } from 'socket.io';
import { WsAction } from '@online-library/api-interfaces';
import { UpdateBook } from './actions';

@WebSocketGateway()
export class BookGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  clients: Socket[] = [];

  constructor(
    private bookingService: BookingService,
  ) {
    this.bookingService.updatedBook$
      .subscribe(book => this.broadcast(UpdateBook(book)));
  }

  handleConnection(client: Socket, ...args) {
    this.clients.push(client);
  }

  handleDisconnect(client: Client) {
    this.clients = this.clients.filter(c => c.id !== client.id);
  }

  private broadcast(action: WsAction<any>) {
    this.clients.forEach(client => client.emit(action.type, action.payload));
  }
}
