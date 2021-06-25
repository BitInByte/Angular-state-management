import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: string;
  @Input() time: string;
  @Input() taskId: string;
  @Output() taskSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onTaskSelected(): void {
    this.taskSelected.emit(this.taskId);
  }
}
