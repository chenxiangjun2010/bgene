import { Action } from '@ngrx/store';
import { Auth } from '@domain';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAIL = '[Auth] Login Fail',
    LOGOUT = '[Auth] Logout'
};

export class Login implements Action {
    type = AuthActionTypes.LOGIN;

    constructor(public payload: { username: string, password: string }) {
    }
}

export class LoginSuccess implements Action {
    type = AuthActionTypes.LOGIN_SUCCESS;

    constructor(public payload: Auth) {
    }
}

export class LoginFail implements Action {
    type = AuthActionTypes.LOGIN_FAIL;

    constructor(public payload: any) {
    }
}

export class Logout implements Action {
    type = AuthActionTypes.LOGOUT;

    constructor(public payload: Auth) {
    }
}

export type AuthActionsUnion
    = Login
    | LoginSuccess
    | LoginFail
    | Logout;
