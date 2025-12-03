import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { TaskBoardComponent } from './task-board.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskBoardComponent },
  { path: '**', redirectTo: 'login' }
];
