import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/taskResult.action';
import { Observable, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { TaskResultService } from '@services/taskResult.service';

@Injectable()
export class TaskResultEffects {

    @Effect()
    loadTaskResults$: Observable<Action> = this.actions$.pipe(
        ofType(actions.TaskResultActionTypes.LOADS),
        switchMap(_ => this.taskResultService.get().pipe(
            map(taskTypes => new actions.LoadTaskResultSuccessAction(taskTypes),
                catchError(err => of(new actions.LoadTaskResultFailAction(JSON.stringify(err))))
            )
        ))
    )

    @Effect()
    addTaskResult$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddTaskResultAction>(actions.TaskResultActionTypes.ADD),
        map(action => action.payload),
        switchMap(taskType => this.taskResultService.add(taskType).pipe(
            map(returned => {
                this.msg.success("用户" + returned.name + "创建成功", { nzDuration: 5000 });
                return new actions.AddTaskResultSuccessAction(returned);
            }),
            catchError(err => {
                this.msg.error("用户创建失败," + err, { nzDuration: 5000 });
                return of(new actions.AddTaskResultFailAction(JSON.stringify(err)));
            })
        ))
    )

    @Effect()
    updateTaskResult$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateTaskResultAction>(actions.TaskResultActionTypes.UPDATE),
        map(action => action.payload),
        switchMap((taskResult) => this.taskResultService.update(taskResult).pipe(
            map(returned => {
                this.msg.success("用户" + returned.name + "修改成功", { nzDuration: 5000 });
                return new actions.UpdateTaskResultSuccessAction(returned)
            }),
            catchError(err => {
                this.msg.error("用户修改失败," + err, { nzDuration: 5000 });
                return of(new actions.UpdateTaskResultFailAction(JSON.stringify(err)))
            })
        ))
    )

    @Effect()
    removeTaskType$: Observable<Action> = this.actions$.pipe(
        ofType<actions.DeleteTaskResultAction>(actions.TaskResultActionTypes.DELETE),
        map(action => action.payload),
        switchMap(taskResult => this.taskResultService.del(taskResult).pipe(
            map(returned => {
                if (returned.success == 1) {
                    this.msg.success("用户删除成功", { nzDuration: 5000 });
                    return new actions.DeleteTaskResultSuccessAction(taskResult)
                } else {
                    this.msg.error("用户删除失败," + returned.msg, { nzDuration: 5000 });
                    return new actions.DeleteTaskResultFailAction(JSON.stringify(returned.msg));
                }
            }),
            catchError(err => {
                this.msg.error("用户删除失败," + err, { nzDuration: 5000 });
                return of(new actions.DeleteTaskResultFailAction(JSON.stringify(err)))
            })
        ))
    )

    @Effect()
    searchTaskResult$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SearchTaskResultAction>(actions.TaskResultActionTypes.SEARCH),
        map(action => action.payload),
        switchMap((data) => this.taskResultService.searchUsers(data).pipe(
            map(taskResult => {
                if (taskResult.length == 0) {
                    this.msg.warning("没有符合查询条件的用户信息", { nzDuration: 5000 });
                    return new actions.SearchTaskResultFailAction(JSON.stringify("无结果"));
                } else {
                    this.msg.success("用户查询成功", { nzDuration: 5000 });
                    return new actions.SearchTaskResultSuccessAction(taskResult);
                }
            }),
            catchError(err => {
                this.msg.error("用户查询失败，" + err, { nzDuration: 5000 });
                return of(new actions.SearchTaskResultFailAction(JSON.stringify(err)));
            })
        ))
    )

    constructor(private actions$: Actions, private taskResultService: TaskResultService, private router: Router, private msg: NzMessageService) { }
}






