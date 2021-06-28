import * as TasksActions from './task.actions';
import { Task } from '../task.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export const taskFeatureKey = 'tasks';

// Reducer is a listener of actions
export interface State {
  tasks: Task[];
}

export interface TaskState {
  tasks: State;
}

export const selectFeature =
  createFeatureSelector<TaskState, State>(taskFeatureKey);

export const selectFeatureTasks = createSelector(
  selectFeature,
  (state: State) => state.tasks
);

const initialState: State = {
  tasks: [],
};

const _taskReducer = createReducer(
  initialState,
  on(TasksActions.tasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks],
  })),
  on(TasksActions.addTask, (state, { task }) => {
    const newState = state.tasks.slice();
    newState.push(task);
    return {
      ...state,
      tasks: [...newState],
    };
  }),
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => {
    const newState = state.tasks.filter((task) => task.id !== taskId);
    return {
      ...state,
      tasks: newState,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return _taskReducer(state, action);
}
