export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface OrganizationDto {
  id: number;
  name: string;
  parentId?: number | null;
}

export interface UserDto {
  id: number;
  email: string;
  name: string;
  role: Role;
  organizationId: number;
}

export interface TaskDto {
  id: number;
  title: string;
  description?: string;
  category?: string;
  status: TaskStatus;
  position: number;
  organizationId: number;
  ownerId: number;
}
