import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Task {
  id: number;
  title: string;
  description?: string;
  category?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  position: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {}

  loadTasks() {
    this.http.get<Task[]>('/api/tasks').subscribe(tasks => this.tasks$.next(tasks));
  }

  getTasks() {
    return this.tasks$.asObservable();
  }

  createTask(dto: Partial<Task>) {
    return this.http.post<Task>('/api/tasks', dto).pipe(tap(() => this.loadTasks()));
  }

  updateTask(id: number, dto: Partial<Task>) {
    return this.http.put<Task>(`/api/tasks/${id}`, dto).pipe(tap(() => this.loadTasks()));
  }

  deleteTask(id: number) {
    return this.http.delete(`/api/tasks/${id}`).pipe(tap(() => this.loadTasks()));
  }
}
