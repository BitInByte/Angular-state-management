import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { TaskItemComponent } from './tasks-list/task-item/task-item.component';
import { TasksComponent } from './tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TasksListComponent,
    TasksFormComponent,
    TaskItemComponent,
    TasksComponent,
  ],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [TasksComponent],
})
export class TasksModule {}
