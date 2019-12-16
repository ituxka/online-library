import { IBook } from '@online-library/api-interfaces';

export interface Filters {
  title: Filter<string>;
  authors: Filter<number[]>;
  isAvailable: Filter<boolean>;
}

interface Filter<T> {
  value: T;
  fn: (T) => BookFilterFn;
}

export type BookFilterFn = (book: IBook) => boolean;

export const startWithTitle = (title: string): BookFilterFn => {
  return book => book.title.toLowerCase().startsWith(title.toLowerCase());
};

export const containsAuthor = (authorsId: number[]): BookFilterFn => {
  return (book) => {
    if (authorsId.length === 0) {
      return true;
    }

    return authorsId.includes(book.author.id);
  };
};

export const isAvailable = (isMarked: boolean): BookFilterFn => {
  return (book) => {
    if (!isMarked) {
      return true;
    }

    return book.isAvailableToBook === isMarked;
  };
};
