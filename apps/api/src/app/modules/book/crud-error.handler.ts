import { QueryFailedError } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export const handleCrudError = (e: Error) => {
  if (e instanceof QueryFailedError) {
    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
  }
  throw e;
};
