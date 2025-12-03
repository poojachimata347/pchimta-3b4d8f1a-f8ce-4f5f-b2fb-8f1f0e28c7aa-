import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepo: Repository<AuditLog>,
  ) {}

  async log(userId: number, action: string, resource: string, resourceId: string, meta?: any) {
    const log = this.auditRepo.create({
      userId,
      action,
      resource,
      resourceId,
      meta: meta ? JSON.stringify(meta) : null,
    });
    console.log('[AUDIT]', { userId, action, resource, resourceId, meta });
    return this.auditRepo.save(log);
  }

  findAll() {
    return this.auditRepo.find({ order: { createdAt: 'DESC' } });
  }
}
