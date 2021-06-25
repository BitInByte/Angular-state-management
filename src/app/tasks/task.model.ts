export class Task {
  public id?: string;
  public task: string;
  public time: number;
  constructor(task: string, time: number, id?: string) {
    this.id = id;
    this.task = task;
    this.time = time;
  }

  setId(id: string): void {
    this.id = id;
  }
}
