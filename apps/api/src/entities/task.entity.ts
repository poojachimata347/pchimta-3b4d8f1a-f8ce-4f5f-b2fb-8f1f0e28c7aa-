import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ type: 'text', default: TaskStatus.TODO })
  status: TaskStatus;

  @Column({ default: 0 })
  position: number;

  @ManyToOne(() => User, { eager: true })
  owner: User;

  @ManyToOne(() => Organization, { eager: true })
  organization: Organization;
}
