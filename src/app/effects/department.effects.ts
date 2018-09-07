import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import * as actions from '../actions/department.action';
import { Observable, of } from 'rxjs';
import { DepartmentService } from '@services';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class DepartmentEffects {

    @Effect()
    loadDepartments$: Observable<Action> = this.actions$.pipe(
        ofType(actions.DepartmentActionTypes.LOADS),
        switchMap(_ => this.DepartmentService.get().pipe(
            map(departments => new actions.LoadDepartmentSuccessAction(departments)),
            catchError(err => of(new actions.LoadDepartmentFailAction(JSON.stringify(err))))
        ))
    )

    @Effect()
    addDepartment$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddDepartmentAction>(actions.DepartmentActionTypes.ADD),
        map(action => action.payload),
        mergeMap(department => {
            return this.DepartmentService.add(department).pipe(
                map(returned => {
                    this.msg.success("科室" + returned.name + "创建成功", { nzDuration: 5000 });
                    return new actions.AddDepartmentSuccessAction(returned)
                }),
                catchError(err => {
                    this.msg.error("科室创建失败," + err, { nzDuration: 5000 });
                    return of(new actions.AddDepartmentFailAction(JSON.stringify(err)))
                })
            )
        })
    )

    @Effect()
    updateDepartment$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateDepartmentAction>(actions.DepartmentActionTypes.UPDATE),
        map(action => action.payload),
        mergeMap((department) => this.DepartmentService.update(department).pipe(
            map(returned => {
                this.msg.success("科室" + returned.name + "修改成功", { nzDuration: 5000 });
                return new actions.UpdateDepartmentSuccessAction(returned)
            }),
            catchError(err => {
                this.msg.error("科室修改失败," + err, { nzDuration: 5000 });
                return of(new actions.UpdateDepartmentFailAction(JSON.stringify(err)))
            })
        ))
    )

    @Effect()
    removeDepartment$: Observable<Action> = this.actions$.pipe(
        ofType<actions.DeleteDepartmentAction>(actions.DepartmentActionTypes.DELETE),
        map(action => action.payload),
        mergeMap(department => this.DepartmentService.del(department).pipe(
            map(returned => {
                this.msg.success("科室" + returned.name + "删除成功", { nzDuration: 5000 });
                return new actions.DeleteDepartmentSuccessAction(department)
            }),
            catchError(err => {
                this.msg.error("科室删除失败," + err, { nzDuration: 5000 });
                return of(new actions.DeleteDepartmentFailAction(JSON.stringify(err)))
            })
        ))
    )

    constructor(private actions$: Actions, private DepartmentService: DepartmentService, private msg: NzMessageService) { }
}






