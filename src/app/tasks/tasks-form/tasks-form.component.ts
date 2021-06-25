import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { TasksStore } from '../tasks.store';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
  providers: [SpinnerService],
})
export class TasksFormComponent implements OnInit {
  @ViewChild('taskInput', { static: true }) taskInputRef: ElementRef;

  constructor(
    public spinnerService: SpinnerService,
    private tasksStore: TasksStore,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    const value = event.target[0].value;
    if (value.length > 0) {
      const task = new Task(value, Date.now());
      const saveTask$ = this.taskService.saveTask(task);
      this.spinnerService
        .showLoadingUntilCompleted(saveTask$)
        .subscribe((taskResult) => {
          task.setId(taskResult.name);
          this.tasksStore.saveTask(task);
        });

    }
  }
}
