import {
  Entity,
  Column,
  ManyToMany,
} from 'typeorm';
import { IUser, UserRole } from '@online-library/api-interfaces';
import { BaseModel } from '../base.entity';
import { Book } from '../book/book.entity';

@Entity()
export class User extends BaseModel implements IUser {

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToMany('Book', 'holders')
  bookedBooks: Book[];
}
