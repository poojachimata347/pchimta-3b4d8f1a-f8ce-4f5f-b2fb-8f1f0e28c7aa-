import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Organization } from '../entities/organization.entity';
import { User } from '../entities/user.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>,
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly audit: AuditService,
  ) {}

  async getAccessibleOrgIds(userOrgId: number): Promise<number[]> {
    const orgs = await this.orgRepo.find({ relations: ['parent', 'children'] });
    const ids = new Set<number>();
    const stack = [userOrgId];
    while (stack.length) {
      const id = stack.pop()!;
      if (ids.has(id)) continue;
      ids.add(id);
      orgs
        .filter((o) => o.parent && o.parent.id === id)
        .forEach((child) => stack.push(child.id));
    }
    return [...ids];
  }

  async findAllForUser(user: any) {
    const orgIds = await this.getAccessibleOrgIds(user.orgId);
    return this.tasksRepo.find({
      where: { organization: { id: In(orgIds) } },
      order: { position: 'ASC' },
    });
  }

  async createTask(user: any, dto: any) {
    const owner = await this.usersRepo.findOne({ where: { id: user.userId } });
    const org = await this.orgRepo.findOne({ where: { id: user.orgId } });
    const task = this.tasksRepo.create({ ...dto, owner, organization: org });
    const saved = await this.tasksRepo.save(task);
    await this.audit.log(user.userId, 'CREATE_TASK', 'Task', String(saved.id), dto);
    return saved;
  }

  async updateTask(user: any, id: number, dto: any) {
    const existing = await this.tasksRepo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException();
    Object.assign(existing, dto);
    const saved = await this.tasksRepo.save(existing);
    await this.audit.log(user.userId, 'UPDATE_TASK', 'Task', String(id), dto);
    return saved;
  }

  async deleteTask(user: any, id: number) {
    await this.tasksRepo.delete(id);
    await this.audit.log(user.userId, 'DELETE_TASK', 'Task', String(id));
  }
}
