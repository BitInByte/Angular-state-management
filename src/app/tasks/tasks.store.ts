import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Injectable({ providedIn: 'root' })
export class TasksStore {
  // BehaviorSubject allows us to specify
  // an initial value
  private subject = new BehaviorSubject<Task[]>([]);

  readonly tasks$: Observable<Task[]> = this.subject.asObservable();

  constructor(
    private taskService: TaskService,
    private spinnerService: SpinnerService
  ) {
    this.loadAllTasks();
  }

  saveTask(task: Task): void {
    // Get the last value emitted
    const tasks = this.subject.getValue();

    tasks.push(task);

    this.subject.next(tasks);
  }

  deleteTask(taskId: string): void {
    const tasks = this.subject.getValue();

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    this.taskService
      .deleteTask(taskId)
      .pipe(
        tap((resData) => {
          console.log('Response: ', resData);
          this.subject.next(updatedTasks);
        })
      )
      .subscribe();
  }

  private loadAllTasks(): void {
    const loadTasks$ = this.taskService
      .getTasks()
      .pipe(tap((tasks) => this.subject.next(tasks)));
    this.spinnerService.showLoadingUntilCompleted(loadTasks$).subscribe();
  }
}
