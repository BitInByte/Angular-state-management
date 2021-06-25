import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from './task.model';

interface IGetTasks {
  [key: string]: Task;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly ENDPOINT: string = 'tasks.json';
  readonly url: string = environment.apiEndpoint + '/' + this.ENDPOINT;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<IGetTasks>(this.url).pipe(
      map((resData) => {
        // Firebase return an object instead of an array
        const tasks: Task[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            tasks.push(new Task(resData[key].task, resData[key].time, key));
          }
        }
        return tasks;
      }),
      tap(console.log),
      take(1),
      shareReplay()
    );
  }

  saveTask(task: Task): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.url, task);
  }

  deleteTask(taskId: string): Observable<null> {
    return this.http.delete<null>(
      `${environment.apiEndpoint}/tasks/${taskId}.json`
    );
  }
}
