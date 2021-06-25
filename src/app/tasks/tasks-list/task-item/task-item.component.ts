import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksStore } from '../../tasks.store';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: string;
  @Input() time: string;
  @Input() taskId: string;

  constructor(private tasksStore: TasksStore) {}

  ngOnInit(): void {}

  onTaskSelected(): void {
    this.tasksStore.deleteTask(this.taskId);
  }
}
