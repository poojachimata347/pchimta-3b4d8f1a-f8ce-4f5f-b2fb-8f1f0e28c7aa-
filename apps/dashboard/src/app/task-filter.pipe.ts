import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.service';

@Pipe({ name: 'taskFilter', standalone: true })
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], text: string, category: string): Task[] {
    return tasks.filter(t => {
      const matchText = text ? t.title.toLowerCase().includes(text.toLowerCase()) : true;
      const matchCat = category ? t.category === category : true;
      return matchText && matchCat;
    });
  }
}
