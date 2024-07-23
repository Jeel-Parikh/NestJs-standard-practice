import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(2, {
    message: 'userName must be longer than or equal to 2 characters',
  })
  userName: string;

  @Column({ unique: true, nullable: false, update: false }) // default nullable is false
  @IsEmail(undefined, { message: 'userEmail must be an email' })
  userEmail: string;

  @Column({ select: false })
  @MinLength(5, {
    message: 'userPassword must be longer than or equal to 5 characters',
  })
  @IsNotEmpty({ message: 'userPassword should not be empty' })
  userPassword: string;

  @Column()
  @IsNotEmpty({ message: 'userRole should not be empty' })
  userRole: string; // create separate role type

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
