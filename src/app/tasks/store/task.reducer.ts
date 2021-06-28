import * as Tasks from './task.actions';
import { Task } from '../task.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  tasks: Task[];
}

export interface TaskState {
  tasks: State;
}

export const selectFeature = createFeatureSelector<TaskState, State>('tasks');

export const selectFeatureTasks = createSelector(
  selectFeature,
  (state: State) => state.tasks
);

const initialState: State = {
  tasks: [],
};

export function taskReducer(
  state = initialState,
  action: Tasks.ActionsUnion
): State {
  switch (action.type) {
    case Tasks.ActionTypes.TasksSuccess: {
      console.log('Tasks Success: ', action.payload.tasks);
      return {
        ...state,
        tasks: [...action.payload.tasks],
      };
    }
    case Tasks.ActionTypes.AddTask: {
      console.log('Add Task: ', action.payload.task);
      const newState = state.tasks.slice();
      newState.push(action.payload.task);
      return {
        ...state,
        tasks: [...newState],
      };
    }
    case Tasks.ActionTypes.DeleteSuccess: {
      console.log('Delete Task: ', action.payload.taskId);
      const newState = state.tasks.filter(
        (task) => task.id !== action.payload.taskId
      );
      return {
        ...state,
        tasks: newState,
      };
    }
    default:
      return state;
  }
}
