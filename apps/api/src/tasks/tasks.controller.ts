import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RbacGuard } from '../auth/rbac.guard';
import { Roles, CurrentUser } from '@taskmgr/auth';
import { Role } from '../entities/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RbacGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@CurrentUser() user: any) {
    return this.tasksService.findAllForUser(user);
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(@CurrentUser() user: any, @Body() dto: any) {
    return this.tasksService.createTask(user, dto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: any) {
    return this.tasksService.updateTask(user, +id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tasksService.deleteTask(user, +id);
  }
}
