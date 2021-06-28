import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { finalize, map, mergeMap, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import * as Tasks from './task.actions';

@Injectable()
export class TaskEffects {
  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(Tasks.ActionTypes.GetTasks),
    tap(() => this.spinnerService.loadingOn()),
    // Call of async logic
    mergeMap(() =>
      this.taskService.getTasks().pipe(
        map((tasks) => new Tasks.TasksSuccess({ tasks })),
        finalize(() => this.spinnerService.loadingOff())
      )
    )
  );

  @Effect()
  addTask$ = this.actions$.pipe(
    ofType(Tasks.ActionTypes.SaveTask),
    // tap(() => this.spinnerService.loadingOn()),
    mergeMap((taskAction: Tasks.SaveTask) =>
      this.taskService.saveTask(taskAction.payload.task).pipe(
        map((taskRes) => {
          console.log(taskAction);
          // task.payload.task.id = taskRes.name;
          const newTask = new Task(
            taskAction.payload.task.task,
            taskAction.payload.task.time,
            taskRes.name
          );
          return new Tasks.AddTask({ task: newTask });
        })
        // finalize(() => this.spinnerService.loadingOff())
      )
    )
  );

  @Effect()
  deleteTask$ = this.actions$.pipe(
    ofType(Tasks.ActionTypes.DeleteTask),
    // tap(() => this.spinnerService.loadingOn()),
    mergeMap((taskAction: Tasks.DeleteTask) =>
      this.taskService
        .deleteTask(taskAction.payload.taskId)
        .pipe(
          map(
            () =>
              new Tasks.DeleteTaskSuccess({ taskId: taskAction.payload.taskId })
          )
        )
    )
    // finalize(() => this.spinnerService.loadingOff())
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private spinnerService: SpinnerService
  ) {}
}
