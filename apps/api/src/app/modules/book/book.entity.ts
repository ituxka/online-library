import { Check, Column, Entity, JoinTable, ManyToMany, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../base.entity';
import { Author } from '../author/author.entity';
import { IsISO8601, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IBook } from '@online-library/api-interfaces';
import { User } from '../user/user.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

const columnNames = {
  copiesInUse: 'copies_in_use',
  copiesOrdered: 'copies_ordered',
};

const checkOverflow = `${columnNames.copiesInUse} + ${columnNames.copiesOrdered} <= copies`;

@Entity()
@Unique(['title', 'author'])
@Check(checkOverflow)
export class Book extends BaseModel implements IBook {
  @IsOptional({ groups: [UPDATE] })
  @IsString({ always: true })
  @MinLength(3, { always: true })
  @Column()
  title: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNumber({}, { always: true })
  @ManyToOne('Author', 'books')
  author: Author;

  @IsOptional({ groups: [UPDATE] })
  @IsISO8601()
  @Column()
  published: Date;

  @Column({
    default: false,
  })
  isAvailableToOrder: boolean;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @Column({ nullable: true })
  coverImage: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNumber({}, { always: true })
  @Column({ default: 0 })
  copies: number;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsNumber({}, { always: true })
  @Column({
    default: 0,
    name: columnNames.copiesInUse,
  })
  copiesInUse: number;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsNumber({}, { always: true })
  @Column({
    default: 0,
    name: columnNames.copiesOrdered,
  })
  copiesOrdered: number;

  @ManyToMany('User', 'orderedBooks')
  @JoinTable()
  holders: User[];
}
