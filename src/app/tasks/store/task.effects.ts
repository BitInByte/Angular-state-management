import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { finalize, map, mergeMap, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import * as TasksActions from './task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTasks),
      tap(() => this.spinnerService.loadingOn()),
      // Call of async logic
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TasksActions.tasksSuccess({ tasks })),
          finalize(() => this.spinnerService.loadingOff())
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.saveTask),
      mergeMap((taskAction) =>
        this.taskService.saveTask(taskAction.task).pipe(
          map((taskRes) => {
            console.log(taskAction);
            const newTask = new Task(
              taskAction.task.task,
              taskAction.task.time,
              taskRes.name
            );
            return TasksActions.addTask({ task: newTask });
          })
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      mergeMap(({ taskId }) =>
        this.taskService
          .deleteTask(taskId)
          .pipe(map(() => TasksActions.deleteTaskSuccess({ taskId })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private spinnerService: SpinnerService
  ) {}
}
