import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/sysuser.action';
import { Observable, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '@services/user.service';

@Injectable()
export class UserEffects {

    @Effect()
    loadUsers$: Observable<Action> = this.actions$.pipe(
        ofType(actions.SysUserActionTypes.LOADS),
        switchMap(_ => this.userService.get().pipe(
            map(users => new actions.LoadUserSuccessAction(users),
                catchError(err => of(new actions.LoadUserFailAction(JSON.stringify(err))))
            )
        ))
    )

    @Effect()
    addUsers$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddUserAction>(actions.SysUserActionTypes.ADD),
        map(action => action.payload),
        switchMap(user => this.userService.add(user).pipe(
            map(returned => {
                this.msg.success("用户" + returned.name + "创建成功", { nzDuration: 5000 });
                return new actions.AddUserSuccessAction(returned);
            }),
            catchError(err => {
                this.msg.error("用户创建失败," + err, { nzDuration: 5000 });
                return of(new actions.AddUserFailAction(JSON.stringify(err)));
            })
        ))
    )

    @Effect()
    updateUser$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateUserAction>(actions.SysUserActionTypes.UPDATE),
        map(action => action.payload),
        switchMap((user) => this.userService.update(user).pipe(
            map(returned => {
                this.msg.success("用户" + returned.name + "修改成功", { nzDuration: 5000 });
                return new actions.UpdateUserSuccessAction(returned)
            }),
            catchError(err => {
                this.msg.error("用户修改失败," + err, { nzDuration: 5000 });
                return of(new actions.UpdateUserFailAction(JSON.stringify(err)))
            })
        ))
    )

    @Effect()
    removeUser$: Observable<Action> = this.actions$.pipe(
        ofType<actions.DeleteUserAction>(actions.SysUserActionTypes.DELETE),
        map(action => action.payload),
        switchMap(user => this.userService.del(user).pipe(
            map(returned => {
                if (returned.success == 1) {
                    this.msg.success("用户删除成功", { nzDuration: 5000 });
                    return new actions.DeleteUserSuccessAction(user)
                } else {
                    this.msg.error("用户删除失败," + returned.msg, { nzDuration: 5000 });
                    return new actions.DeleteUserFailAction(JSON.stringify(returned.msg));
                }
            }),
            catchError(err => {
                this.msg.error("用户删除失败," + err, { nzDuration: 5000 });
                return of(new actions.DeleteUserFailAction(JSON.stringify(err)))
            })
        ))
    )

    @Effect()
    batchDelUsers$: Observable<Action> = this.actions$.pipe(
        ofType<actions.BatchDelUserAction>(actions.SysUserActionTypes.BATCHDEL),
        map(action => action.payload),
        switchMap(users => this.userService.batchDel(users).pipe(
            map(returned => {
                if (returned.success == 1) {
                    this.msg.success("用户批量删除成功", { nzDuration: 5000 });
                    return new actions.BatchDelUserSuccessAction(users);
                } else {
                    this.msg.error("用户批量删除失败：" + returned.msg, { nzDuration: 5000 });
                    return new actions.BatchDelUserFailAction(JSON.stringify(returned.msg));
                }

            }),
            catchError(err => {
                this.msg.error("用户批量删除失败：" + err, { nzDuration: 5000 });
                return of(new actions.BatchDelUserFailAction(JSON.stringify(err)));
            })
        ))
    )

    @Effect()
    searchUsers$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SearchUserAction>(actions.SysUserActionTypes.SEARCH),
        map(action => action.payload),
        switchMap((data) => this.userService.searchUsers(data).pipe(
            map(users => {
                if (users.length == 0) {
                    this.msg.warning("没有符合查询条件的用户信息", { nzDuration: 5000 });
                    return new actions.SearchUserFailAction(JSON.stringify("无结果"));
                } else {
                    this.msg.success("用户查询成功", { nzDuration: 5000 });
                    return new actions.SearchUserSuccessAction(users);
                }
            }),
            catchError(err => {
                this.msg.error("用户查询失败，" + err, { nzDuration: 5000 });
                return of(new actions.SearchUserFailAction(JSON.stringify(err)));
            })
        ))
    )

    constructor(private actions$: Actions, private userService: UserService, private router: Router, private msg: NzMessageService) { }
}






