import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Tasks from '../../store/task.actions';

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
    this.store.dispatch(new Tasks.DeleteTask({ taskId: this.taskId }));
  }
}
