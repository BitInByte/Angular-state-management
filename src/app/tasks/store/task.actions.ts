import { createAction, props } from '@ngrx/store';
import { Task } from '../task.model';

// Square brackets to create a category,
// The first is the name of the feature and
// the second is from where the action came from
export const getTasks = createAction('[Task Page] Get Tasks');
export const tasksSuccess = createAction(
  '[Task API] Tasks Success',
  props<{ tasks: Task[] }>()
);
export const saveTask = createAction(
  '[Task Page] Save Task',
  props<{ task: Task }>()
);
export const addTask = createAction(
  '[Task API] Add Task',
  props<{ task: Task }>()
);
export const deleteTask = createAction(
  '[Task Page] Delete Task',
  props<{ taskId: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Task API] Delete Task Success',
  props<{ taskId: string }>()
);
