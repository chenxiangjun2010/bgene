import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import * as actions from '../actions/sample.action';
import { Observable, of } from 'rxjs';
import { SampleService } from '@services';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class SampleEffects {

    @Effect()
    loadSamples$: Observable<Action> = this.actions$.pipe(
        ofType(actions.SampleActionTypes.LOADS),
        switchMap(_ => this.SampleService.get().pipe(
            map(sample => new actions.LoadSampleSuccessAction(sample)),
            catchError(err => of(new actions.LoadSampleFailAction(JSON.stringify(err))))
        ))
    )

    @Effect()
    addSample$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddSampleAction>(actions.SampleActionTypes.ADD),
        map(action => action.payload),
        mergeMap(sample => {
            console.log(sample); 
            return this.SampleService.add(sample).pipe(
            map(returned => {
                this.msg.success("样本" + returned.name + "创建成功", { nzDuration: 5000 });
                return new actions.AddSampleSuccessAction(returned)
            }),
            catchError(err => {
                this.msg.error("样本创建失败," + err, { nzDuration: 5000 });
                return of(new actions.AddSampleFailAction(JSON.stringify(err)))
            })
        )})
    )

    @Effect()
    updateSample$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateSampleAction>(actions.SampleActionTypes.UPDATE),
        map(action => action.payload),
        mergeMap((sample) => this.SampleService.update(sample).pipe(
            map(returned => {
                this.msg.success("样本" + returned.name + "修改成功", { nzDuration: 5000 });
                return new actions.UpdateSampleSuccessAction(returned)
            }),
            catchError(err => {
                this.msg.error("样本修改失败," + err, { nzDuration: 5000 });
                return of(new actions.UpdateSampleFailAction(JSON.stringify(err)))
            })
        ))
    )

    // @Effect()
    // removeSample$: Observable<Action> = this.actions$.pipe(
    //     ofType<actions.DeleteSampleAction>(actions.SampleActionTypes.DELETE),
    //     map(action => action.payload),
    //     mergeMap(hospital => this.SampleService.del(hospital).pipe(
    //         map(returned => {
    //             this.msg.success("样本" + returned.name + "删除成功", { nzDuration: 5000 });
    //             return new actions.DeleteSampleSuccessAction(hospital)
    //         }),
    //         catchError(err => {
    //             this.msg.error("样本删除失败," + err, { nzDuration: 5000 });
    //             return of(new actions.DeleteSampleFailAction(JSON.stringify(err)))
    //         })
    //     ))
    // )

    constructor(private actions$: Actions, private SampleService: SampleService, private msg: NzMessageService) { }
}






