import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { Task } from '../task.model';
import * as TasksActions from '../store/task.actions';
import { takeUntil, tap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
  providers: [SpinnerService],
})
export class TasksFormComponent implements OnInit, OnDestroy {
  @ViewChild('taskInput', { static: true }) taskInputRef: ElementRef;
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    public spinnerService: SpinnerService,
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.actions$
      .pipe(
        ofType(TasksActions.saveTask),
        takeUntil(this.destroyed$),
        tap(() => {
          this.spinnerService.loadingOn();
        })
      )
      .subscribe();

    this.actions$
      .pipe(
        ofType(TasksActions.addTask),
        takeUntil(this.destroyed$),
        tap(() => this.spinnerService.loadingOff())
      )
      .subscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const value = event.target[0].value;
    if (value.length > 0) {
      const task = new Task(value, Date.now());
      this.store.dispatch(TasksActions.saveTask({ task }));
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
