import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { TasksStore } from '../tasks.store';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  animations: [
    trigger('item', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)',
        }),
        animate(
          // 1000,
          300,
          style({
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          // 1000,
          300,
          style({
            transform: 'translateY(-100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class TasksListComponent implements OnInit {
  constructor(
    public spinnerService: SpinnerService,
    public tasksStore: TasksStore
  ) {}

  ngOnInit(): void {}
}
