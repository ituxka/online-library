import { IBook, WsAction, WsActions } from '@online-library/api-interfaces';

export const UpdateBook = (book: IBook): WsAction<IBook> => {
  return {
    type: WsActions.UPDATE_BOOK,
    payload: book,
  };
};
