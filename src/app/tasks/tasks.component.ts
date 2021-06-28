import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
// import { TaskInterface } from './store/task-state.interface';
import * as Tasks from './store/task.actions';
import * as fromTask from './store/task.reducer';
// import * as fromTaskRoot from './store';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tasks$ = this.store.pipe(select(fromTask.selectFeatureTasks));
    this.store.dispatch(new Tasks.GetTasks());
  }
}
