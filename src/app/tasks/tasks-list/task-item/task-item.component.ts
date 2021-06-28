import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TasksActions from '../../store/task.actions';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: string;
  @Input() time: string;
  @Input() taskId: string;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onTaskSelected(): void {
    this.store.dispatch(TasksActions.deleteTask({ taskId: this.taskId }));
  }
}
