import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import * as actions from '../actions/hospital.action';
import { Observable, of } from 'rxjs';
import { HospitalService } from '@services';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class HospitalEffects {

    @Effect()
    loadHospitals$: Observable<Action> = this.actions$.pipe(
        ofType(actions.HospitalActionTypes.LOADS),
        switchMap(_ => this.HospitalService.get().pipe(
            map(hospitals => new actions.LoadHospitalSuccessAction(hospitals)),
            catchError(err => of(new actions.LoadHospitalFailAction(JSON.stringify(err))))
        ))
    )

    @Effect()
    addHospital$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddHospitalAction>(actions.HospitalActionTypes.ADD),
        map(action => action.payload),
        mergeMap(hospital => {
            return this.HospitalService.add(hospital).pipe(
            map(returned => {
                this.msg.success("医院" + returned.name + "创建成功", { nzDuration: 5000 });
                return new actions.AddHospitalSuccessAction(returned)
            }),
            catchError(err => {
                this.msg.error("医院创建失败," + err, { nzDuration: 5000 });
                return of(new actions.AddHospitalFailAction(JSON.stringify(err)))
            })
        )})
    )

    @Effect()
    updateHospital$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateHospitalAction>(actions.HospitalActionTypes.UPDATE),
        map(action => action.payload),
        mergeMap((hospital) => this.HospitalService.update(hospital).pipe(
            map(returned => {
                this.msg.success("医院" + returned.name + "修改成功", { nzDuration: 5000 });
                return new actions.UpdateHospitalSuccessAction(returned)
            }),
            catchError(err => {
                this.msg.error("医院修改失败," + err, { nzDuration: 5000 });
                return of(new actions.UpdateHospitalFailAction(JSON.stringify(err)))
            })
        ))
    )

    @Effect()
    removeHospital$: Observable<Action> = this.actions$.pipe(
        ofType<actions.DeleteHospitalAction>(actions.HospitalActionTypes.DELETE),
        map(action => action.payload),
        mergeMap(hospital => this.HospitalService.del(hospital).pipe(
            map(returned => {
                if(returned.flag == "1"){
                    this.msg.success("医院" + hospital.name + "删除成功", { nzDuration: 5000 });
                    return new actions.DeleteHospitalSuccessAction(hospital)
                }
                else{
                    this.msg.error("医院删除失败," + returned.msg, { nzDuration: 5000 });
                    return new actions.DeleteHospitalFailAction(JSON.stringify(returned.msg));
                }
            }),
            catchError(err => {
                this.msg.error("医院删除失败," + err, { nzDuration: 5000 });
                return of(new actions.DeleteHospitalFailAction(JSON.stringify(err)))
            })
        ))
    )

    constructor(private actions$: Actions, private HospitalService: HospitalService, private msg: NzMessageService) { }
}






