import { Action } from '@ngrx/store';
import { User } from '@domain';

export enum SysUserActionTypes {
    ADD = '[SysUser] Add',
    ADD_SUCCESS = '[SysUser] Add Success',
    ADD_FAIL = '[SysUser] Add Fail',
    UPDATE = '[SysUser] Update',
    UPDATE_SUCCESS = '[SysUser] Update Success',
    UPDATE_FAIL = '[SysUser] Update Fail',
    DELETE = '[SysUser] Delete',
    DELETE_SUCCESS = '[SysUser] Delete Success',
    DELETE_FAIL = '[SysUser] Delete Fail',
    BATCHDEL = '[SysUser] BatchDelete',
    BATCHDEL_SUCCESS = '[SysUser] BatchDelete Success',
    BATCHDEL_FAIL = '[SysUser] BatchDelete Fail',
    LOADS = '[SysUser] Loads',
    LOADS_SUCCESS = '[SysUser] Loads Success',
    LOADS_FAIL = '[SysUser] Loads Fail',
    SEARCH = '[SysUser] Search',
    SEARCH_SUCCESS = '[SysUser] Search Success',
    SEARCH_FAIL = '[SysUser] Search Fail',
};

export class AddUserAction implements Action {
    type = SysUserActionTypes.ADD;

    constructor(public payload: User) {
    }
}

export class AddUserSuccessAction implements Action {
    type = SysUserActionTypes.ADD_SUCCESS;

    constructor(public payload: User) {
    }
}

export class AddUserFailAction implements Action {
    type = SysUserActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateUserAction implements Action {
    type = SysUserActionTypes.UPDATE;

    constructor(public payload: any) {
    }
}

export class UpdateUserSuccessAction implements Action {
    type = SysUserActionTypes.UPDATE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class UpdateUserFailAction implements Action {
    type = SysUserActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteUserAction implements Action {
    type = SysUserActionTypes.DELETE;

    constructor(public payload: any) {
    }
}

export class DeleteUserSuccessAction implements Action {
    type = SysUserActionTypes.DELETE_SUCCESS;

    constructor(public payload: User) {
    }
}

export class DeleteUserFailAction implements Action {
    type = SysUserActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class BatchDelUserAction implements Action {
    type = SysUserActionTypes.BATCHDEL;

    constructor(public payload: any) {
    }
}

export class BatchDelUserSuccessAction implements Action {
    type = SysUserActionTypes.BATCHDEL_SUCCESS;

    constructor(public payload: User[]) {
    }
}

export class BatchDelUserFailAction implements Action {
    type = SysUserActionTypes.BATCHDEL_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadUserAction implements Action {
    type = SysUserActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadUserSuccessAction implements Action {
    type = SysUserActionTypes.LOADS_SUCCESS;

    constructor(public payload: User[]) {
    }
}

export class LoadUserFailAction implements Action {
    type = SysUserActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchUserAction implements Action {
    readonly type = SysUserActionTypes.SEARCH;

    constructor(public payload: any) { }
}

export class SearchUserSuccessAction implements Action {
    readonly type = SysUserActionTypes.SEARCH_SUCCESS;

    constructor(public payload: User[]) { }
}

export class SearchUserFailAction implements Action {
    readonly type = SysUserActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type SysUserActions
    = AddUserAction
    | AddUserSuccessAction
    | AddUserFailAction
    | UpdateUserAction
    | UpdateUserSuccessAction
    | UpdateUserFailAction
    | DeleteUserAction
    | DeleteUserSuccessAction
    | DeleteUserFailAction
    | BatchDelUserAction
    | BatchDelUserSuccessAction
    | BatchDelUserFailAction
    | LoadUserAction
    | LoadUserSuccessAction
    | SearchUserAction
    | LoadUserFailAction
    | SearchUserSuccessAction
    | SearchUserFailAction;
