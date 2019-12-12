import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../base.entity';
import { Book } from '../book/book.entity';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsISO8601, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('authors')
export class Author extends BaseModel {
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MinLength(3, { always: true })
  @Column({ unique: true, nullable: false  })
  name: string;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsISO8601({ always: true })
  @Column({ nullable: true })
  birthday: Date;

  @OneToMany('Book', 'author')
  books: Book[];
}
