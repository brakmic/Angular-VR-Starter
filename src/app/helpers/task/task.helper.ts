import { Injectable } from '@angular/core';
import { LogService } from 'app/services';
import { ITask } from 'app/interfaces';
import * as _ from 'lodash';

@Injectable()
export class TaskHelper {
 private tasks: ITask[] = [];
 /**
  * Creates an instance of TaskHelper.
  * TaskHelper can be used to pre-register certain events to be executed before 
  * starting some main task. For example, preloading styles and default settings 
  * before starting the main application.
  * 
  * @param {LogService} logService
  */
 constructor(private logService: LogService) {

 }
  public registerTask(task: ITask) {
    if (!_.isNil(task) &&
        !_.isNil(task.logic)) {
          this.tasks.push(task);
          this.logService.logEx(`Task '${task.name}' registered.`, 'TaskHelper');
     }
  }

  public clearTasks(): void {
    this.tasks = [];
  }

  public loadTasks(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.executeTasks(resolve);
    });
  }

  private executeTasks(done: Function) {
    setTimeout(() => {
      const callables = _.map(this.tasks, (tsk) => {
        this.logService.logEx(`Getting task ${tsk.name}`, 'TaskHelper');
        return tsk.logic;
      });
      Promise.all(callables).then((all) => {
        done.call(undefined, all);
      }).catch((error) => {
        this.logService.logEx(error, 'TaskHelper');
      });
    });
  }
}