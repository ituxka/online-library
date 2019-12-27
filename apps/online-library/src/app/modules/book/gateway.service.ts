import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { IBook, WsActions } from '@online-library/api-interfaces';

@Injectable()
export class GatewayService {
  constructor(
    private socket: Socket,
  ) {
  }

  onUpdateBook(): Observable<IBook> {
    return this.socket.fromEvent<IBook>(WsActions.UPDATE_BOOK);
  }
}
