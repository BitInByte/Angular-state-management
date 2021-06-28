import { Action } from '@ngrx/store';
import { Task } from '../task.model';

export enum ActionTypes {
  // Square brackets to create a category,
  // The first is the name of the feature and
  // the second is from where the action came from
  GetTasks = '[Task Page] Get Tasks',
  TasksSuccess = '[Task API] Tasks Success',
  SaveTask = '[Task Page] Save Task',
  AddTask = '[Task API] Add Task',
  DeleteTask = '[Task Page] Delete Task',
  DeleteSuccess = '[Task API] Delete Task Success',
}

export class GetTasks implements Action {
  readonly type = ActionTypes.GetTasks;
}

export class TasksSuccess implements Action {
  readonly type = ActionTypes.TasksSuccess;

  constructor(public payload: { tasks: Task[] }) {}
}

export class SaveTask implements Action {
  readonly type = ActionTypes.SaveTask;

  constructor(public payload: { task: Task }) {}
}

export class AddTask implements Action {
  readonly type = ActionTypes.AddTask;
  constructor(public payload: { task: Task }) {}
}

export class DeleteTask implements Action {
  readonly type = ActionTypes.DeleteTask;
  constructor(public payload: { taskId: string }) {}
}

export class DeleteTaskSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
  constructor(public payload: { taskId: string }) {}
}

export type ActionsUnion =
  | GetTasks
  | TasksSuccess
  | AddTask
  | SaveTask
  | DeleteTask
  | DeleteTaskSuccess;
