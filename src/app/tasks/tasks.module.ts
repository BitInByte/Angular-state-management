import { NgModule } from '@angular/core';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { TaskItemComponent } from './tasks-list/task-item/task-item.component';
import { TasksComponent } from './tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { SpinnerService } from '../shared/spinner/spinner.service';

@NgModule({
  declarations: [
    TasksListComponent,
    TasksFormComponent,
    TaskItemComponent,
    TasksComponent,
  ],
  imports: [BrowserAnimationsModule, SharedModule],
  providers: [SpinnerService],
  exports: [TasksComponent],
})
export class TasksModule {}
