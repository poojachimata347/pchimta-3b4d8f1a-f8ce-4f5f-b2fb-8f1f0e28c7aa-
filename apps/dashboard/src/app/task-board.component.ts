import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService, Task } from './task.service';
import { TaskFilterPipe } from './task-filter.pipe';

@Component({
  standalone: true,
  selector: 'app-task-board',
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag, CdkDropListGroup, TaskFilterPipe],
  template: \`
  <div class="p-4 space-y-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div class="font-semibold text-lg">My Tasks</div>
      <div class="flex gap-2 text-xs">
        <input [(ngModel)]="filterText" placeholder="Search" class="border px-2 py-1 rounded" />
        <select [(ngModel)]="filterCategory" class="border px-2 py-1 rounded">
          <option value="">All</option>
          <option>Work</option>
          <option>Personal</option>
        </select>
      </div>
    </div>

    <form (ngSubmit)="addTask()" class="flex flex-col md:flex-row gap-2">
      <input [(ngModel)]="newTitle" name="title" placeholder="Task title"
             class="border px-2 py-1 rounded flex-1 text-sm" required />
      <select [(ngModel)]="newCategory" name="category" class="border px-2 py-1 rounded text-sm">
        <option>Work</option>
        <option>Personal</option>
      </select>
      <button class="bg-slate-900 text-white px-3 py-1 rounded text-sm">Add</button>
    </form>

    <div cdkDropListGroup class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-slate-50 rounded-xl p-3 flex flex-col" *ngFor="let col of columns">
        <div class="font-medium text-sm mb-2">{{ col.label }}</div>
        <div cdkDropList [cdkDropListData]="col.items" (cdkDropListDropped)="drop($event, col.status)"
             class="flex-1 min-h-[100px] space-y-2">
          <div *ngFor="let task of col.items | taskFilter:filterText:filterCategory"
               cdkDrag
               class="bg-white rounded-lg shadow px-3 py-2 text-xs flex justify-between items-start">
            <div>
              <div class="font-semibold">{{ task.title }}</div>
              <div class="text-slate-500" *ngIf="task.category">{{ task.category }}</div>
            </div>
            <button (click)="delete(task)" class="text-red-500 text-[10px] ml-2">✕</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  \`
})
export class TaskBoardComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  newTitle = '';
  newCategory = 'Work';
  filterText = '';
  filterCategory = '';

  columns: { label: string; status: Task['status']; items: Task[] }[] = [];

  constructor(private tasks: TaskService) {}

  ngOnInit() {
    this.columns = [
      { label: 'To Do', status: 'TODO', items: this.todo },
      { label: 'In Progress', status: 'IN_PROGRESS', items: this.inProgress },
      { label: 'Done', status: 'DONE', items: this.done },
    ];
    this.tasks.getTasks().subscribe(all => {
      this.todo.splice(0, this.todo.length, ...all.filter(t => t.status === 'TODO'));
      this.inProgress.splice(0, this.inProgress.length, ...all.filter(t => t.status === 'IN_PROGRESS'));
      this.done.splice(0, this.done.length, ...all.filter(t => t.status === 'DONE'));
    });
    this.tasks.loadTasks();
  }

  drop(event: CdkDragDrop<Task[]>, status: Task['status']) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    const task = event.container.data[event.currentIndex];
    this.tasks.updateTask(task.id, { status }).subscribe();
  }

  addTask() {
    if (!this.newTitle.trim()) return;
    this.tasks.createTask({
      title: this.newTitle,
      category: this.newCategory,
      status: 'TODO',
      position: 0
    }).subscribe();
    this.newTitle = '';
  }

  delete(task: Task) {
    this.tasks.deleteTask(task.id).subscribe();
  }
}
