export interface WsAction<T> {
  type: string;
  payload: T;
}

export enum WsActions {
  UPDATE_BOOK = 'UPDATE_BOOK',
}
