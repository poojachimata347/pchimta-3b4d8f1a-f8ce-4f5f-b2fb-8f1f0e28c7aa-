import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
  <div class="min-h-screen flex flex-col">
    <header class="bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
      <div class="font-semibold">Secure Task Manager</div>
      <div class="text-xs">Demo Assessment Build</div>
    </header>
    <main class="flex-1">
      <router-outlet></router-outlet>
    </main>
  </div>
  \`
})
export class AppComponent {}
