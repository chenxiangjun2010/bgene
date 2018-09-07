import { Action } from '@ngrx/store';
import { Department } from '@domain';

export enum DepartmentActionTypes {
    ADD = '[Department] Add',
    ADD_SUCCESS = '[Department] Add Success',
    ADD_FAIL = '[Department] Add Fail',
    UPDATE = '[Department] Update',
    UPDATE_SUCCESS = '[Department] Update Success',
    UPDATE_FAIL = '[Department] Update Fail',
    DELETE = '[Department] Delete',
    DELETE_SUCCESS = '[Department] Delete Success',
    DELETE_FAIL = '[Department] Delete Fail',
    BATCHDEL = '[Department] BatchDelete',
    BATCHDEL_SUCCESS = '[Department] BatchDelete Success',
    BATCHDEL_FAIL = '[Department] BatchDelete Fail',
    LOADS = '[Department] Loads',
    LOADS_SUCCESS = '[Department] Loads Success',
    LOADS_FAIL = '[Department] Loads Fail',
    SEARCH = '[Department] Search',
    SEARCH_SUCCESS = '[Department] Search Success',
    SEARCH_FAIL = '[Department] Search Fail',
};

export class AddDepartmentAction implements Action {
    type = DepartmentActionTypes.ADD;

    constructor(public payload: Department) {
    }
}

export class AddDepartmentSuccessAction implements Action {
    type = DepartmentActionTypes.ADD_SUCCESS;

    constructor(public payload: Department) {
    }
}

export class AddDepartmentFailAction implements Action {
    type = DepartmentActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateDepartmentAction implements Action {
    type = DepartmentActionTypes.UPDATE;

    constructor(public payload: Department) {
    }
}

export class UpdateDepartmentSuccessAction implements Action {
    type = DepartmentActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Department) {
    }
}

export class UpdateDepartmentFailAction implements Action {
    type = DepartmentActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteDepartmentAction implements Action {
    type = DepartmentActionTypes.DELETE;

    constructor(public payload: Department) {
    }
}

export class DeleteDepartmentSuccessAction implements Action {
    type = DepartmentActionTypes.DELETE_SUCCESS;

    constructor(public payload: Department) {
    }
}

export class DeleteDepartmentFailAction implements Action {
    type = DepartmentActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class BatchDelDepartmentAction implements Action {
    type = DepartmentActionTypes.BATCHDEL;

    constructor(public payload: Department[]) {
    }
}

export class BatchDelDepartmentSuccessAction implements Action {
    type = DepartmentActionTypes.BATCHDEL_SUCCESS;

    constructor(public payload: Department[]) {
    }
}

export class BatchDelDepartmentFailAction implements Action {
    type = DepartmentActionTypes.BATCHDEL_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadDepartmentAction implements Action {
    type = DepartmentActionTypes.LOADS;

    constructor(public payload: number) {
    }
}

export class LoadDepartmentSuccessAction implements Action {
    type = DepartmentActionTypes.LOADS_SUCCESS;

    constructor(public payload: Department[]) {
    }
}

export class LoadDepartmentFailAction implements Action {
    type = DepartmentActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchDepartmentAction implements Action {
    readonly type = DepartmentActionTypes.SEARCH;

    constructor(public payload: object) { }
}

export class SearchDepartmentSuccessAction implements Action {
    readonly type = DepartmentActionTypes.SEARCH_SUCCESS;

    constructor(public payload: Department[]) { }
}

export class SearchDepartmentFailAction implements Action {
    readonly type = DepartmentActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type DepartmentActions
    = AddDepartmentAction
    | AddDepartmentSuccessAction
    | AddDepartmentFailAction
    | UpdateDepartmentAction
    | UpdateDepartmentSuccessAction
    | UpdateDepartmentFailAction
    | DeleteDepartmentAction
    | DeleteDepartmentSuccessAction
    | DeleteDepartmentFailAction
    | BatchDelDepartmentAction
    | BatchDelDepartmentSuccessAction
    | BatchDelDepartmentFailAction
    | LoadDepartmentAction
    | LoadDepartmentSuccessAction
    | LoadDepartmentFailAction
    | SearchDepartmentAction
    | SearchDepartmentSuccessAction
    | SearchDepartmentFailAction;
