import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import * as actions from '../actions/project.action';
import { Observable, of } from 'rxjs';
import { ProjectService } from '@services';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class ProjectEffects {

    @Effect()
    loadSamples$: Observable<Action> = this.actions$.pipe(
        ofType<actions.LoadProjectAction>(actions.ProjectActionTypes.LOADS),
        switchMap(_ => this.ProjectService.get().pipe(
            map(project => new actions.LoadProjectSuccessAction(project)),
            catchError(err => of(new actions.LoadProjectFailAction(JSON.stringify(err))))
        ))
    )

    @Effect()
    addSample$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddProjectAction>(actions.ProjectActionTypes.ADD),
        map(action => action.payload),
        mergeMap(project => {
            console.log(project);
            return this.ProjectService.add(project).pipe(
                map(returned => {
                    this.msg.success("项目" + returned.name + "创建成功", { nzDuration: 5000 });
                    return new actions.AddProjectSuccessAction(returned)
                }),
                catchError(err => {
                    this.msg.error("项目创建失败," + err, { nzDuration: 5000 });
                    return of(new actions.AddProjectFailAction(JSON.stringify(err)))
                })
            )
        })
    )

    @Effect()
    updateSample$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateProjectAction>(actions.ProjectActionTypes.UPDATE),
        map(action => action.payload),
        mergeMap((project) => this.ProjectService.update(project).pipe(
            map(returned => {
                this.msg.success("项目" + returned.name + "修改成功", { nzDuration: 5000 });
                return new actions.UpdateProjectSuccessAction(returned)
            }),
            catchError(err => {
                this.msg.error("项目修改失败," + err, { nzDuration: 5000 });
                return of(new actions.UpdateProjectFailAction(JSON.stringify(err)))
            })
        ))
    )

    // @Effect()
    // removeSample$: Observable<Action> = this.actions$.pipe(
    //     ofType<actions.DeleteSampleAction>(actions.SampleActionTypes.DELETE),
    //     map(action => action.payload),
    //     mergeMap(hospital => this.ProjectService.del(hospital).pipe(
    //         map(returned => {
    //             this.msg.success("项目" + returned.name + "删除成功", { nzDuration: 5000 });
    //             return new actions.DeleteSampleSuccessAction(hospital)
    //         }),
    //         catchError(err => {
    //             this.msg.error("项目删除失败," + err, { nzDuration: 5000 });
    //             return of(new actions.DeleteSampleFailAction(JSON.stringify(err)))
    //         })
    //     ))
    // )

    constructor(private actions$: Actions, private ProjectService: ProjectService, private msg: NzMessageService) { }
}






