import {
  Entity,
  Column,
} from 'typeorm';
import { UserRole } from '@online-library/api-interfaces';
import { BaseModel } from '../base.entity';

@Entity()
export class User extends BaseModel {

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
}
