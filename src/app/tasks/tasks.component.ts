import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TasksActions from './store/task.actions';
import * as fromTask from './store/task.reducer';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks$ = this.store.select(fromTask.selectFeatureTasks);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(TasksActions.getTasks());
  }
}
