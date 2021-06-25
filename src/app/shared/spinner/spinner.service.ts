import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

// @Injectable()
export class SpinnerService {
  private subject = new BehaviorSubject<boolean>(false);

  readonly isLoading$: Observable<boolean> = this.subject.asObservable();

  constructor() {}

  showLoadingUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn(): void {
    this.subject.next(true);
  }

  loadingOff(): void {
    this.subject.next(false);
  }
}
