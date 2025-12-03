import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: \`
  <div class="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-100">
    <div class="bg-white shadow rounded-xl p-6 w-full max-w-sm">
      <h1 class="text-xl font-semibold mb-4 text-center">Login</h1>
      <form (ngSubmit)="submit()" class="space-y-4">
        <div>
          <label class="text-sm font-medium">Email</label>
          <input [(ngModel)]="email" name="email" type="email"
                 class="mt-1 w-full border rounded px-3 py-2 text-sm" required />
        </div>
        <div>
          <label class="text-sm font-medium">Password</label>
          <input [(ngModel)]="password" name="password" type="password"
                 class="mt-1 w-full border rounded px-3 py-2 text-sm" required />
        </div>
        <div *ngIf="error" class="text-red-600 text-xs">{{ error }}</div>
        <button type="submit"
                class="w-full bg-slate-900 text-white py-2 rounded text-sm font-medium"
                [disabled]="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
  \`
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid credentials';
      }
    });
  }
}
