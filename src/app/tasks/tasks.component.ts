import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [
    new Task('Task1', Date.now()),
    new Task('Task2', Date.now()),
    new Task('Task3', Date.now()),
    new Task('Task4', Date.now()),
    new Task('Task5', Date.now()),
    new Task('Task6', Date.now()),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSubmitTask(task: Task): void {
    this.tasks.push(task);
  }

  onTaskSelected(taskId: string): void {
    console.log(taskId);
    // const newTasks = [...this.tasks];
    // newTasks.splice(+taskId, 1);
    // this.tasks = newTasks;
    this.tasks.splice(+taskId, 1);
  }
}
