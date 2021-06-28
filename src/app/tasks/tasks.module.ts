import { NgModule } from '@angular/core';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { TaskItemComponent } from './tasks-list/task-item/task-item.component';
import { TasksComponent } from './tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTask from './store/task.reducer';
import { TaskEffects } from './store/task.effects';
import { environment } from 'src/environments/environment';

// console.log all actions
// Middleware between action and reducer
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    TasksListComponent,
    TasksFormComponent,
    TaskItemComponent,
    TasksComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forFeature(
      fromTask.taskFeatureKey,
      fromTask.reducer,
      !environment.production && { metaReducers }
    ),
    EffectsModule.forFeature([TaskEffects]),
  ],
  providers: [SpinnerService],
  exports: [TasksComponent],
})
export class TasksModule {}
