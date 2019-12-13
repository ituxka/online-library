import { Check, Column, Entity, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../base.entity';
import { Author } from '../author/author.entity';
import { IsBoolean, IsISO8601, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

const columnNames = {
  copiesInUse: 'copies_in_use',
  copiesBooked: 'copies_booked',
};

const checkOverflow = `${columnNames.copiesInUse} + ${columnNames.copiesBooked} <= copies`;

@Entity()
@Unique(['title', 'author'])
@Check(checkOverflow)
export class Book extends BaseModel {
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

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsBoolean({ always: true })
  @Column({
    default: false,
  })
  isAvailableToBook: boolean;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @Column({ nullable: true })
  coverImage: string;

  @IsOptional({ groups: [CREATE, UPDATE] })
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
    name: columnNames.copiesBooked,
  })
  copiesBooked: number;

}
