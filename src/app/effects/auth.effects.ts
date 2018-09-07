import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '@services';
import * as actions from '../actions/auth.action';
import { NzMessageService } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Injectable()
export class AuthEffects {

    @Effect()
    login$ = this.actions$.pipe(
        ofType<actions.Login>(actions.AuthActionTypes.LOGIN),
        map(action => action.payload),
        exhaustMap((auth: { username: string, password: string }) => this.authService.login(auth.username, auth.password).pipe(
            map(auth => new actions.LoginSuccess(auth)),
            catchError(error => {
                this.msg.error("用户名或密码不正确", { nzDuration: 5000 });
                return of(new actions.LoginFail(error));
            })
        ))
    )

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(actions.AuthActionTypes.LOGIN_SUCCESS),
        tap(() => this.router.navigate(['/layout/info/mine']))
    );

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$.pipe(
        ofType(actions.AuthActionTypes.LOGOUT),
        tap(authed => {
            this.tokenService.clear();
            this.router.navigate(['/passport/login']);
        })
    );

    constructor(private actions$: Actions, private authService: AuthService, private router: Router, private msg: NzMessageService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) { }
}






