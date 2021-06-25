import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent implements OnInit {
  @Output() submitTask = new EventEmitter<Task>();
  @ViewChild('taskInput', { static: true }) taskInputRef: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    const value = event.target[0].value;
    if (value.length > 0) {
      const newTask = new Task(value, Date.now());
      console.log(event);
      this.submitTask.emit(newTask);
    }
    console.log(this.taskInputRef.nativeElement);
    this.taskInputRef.nativeElement.value = '';
    // const newTask = new Task();
  }
}
