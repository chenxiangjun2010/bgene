import { Action } from '@ngrx/store';
import { Doctor } from '@domain';

export enum DoctorActionTypes {
    ADD = '[Doctor] Add',
    ADD_SUCCESS = '[Doctor] Add Success',
    ADD_FAIL = '[Doctor] Add Fail',
    UPDATE = '[Doctor] Update',
    UPDATE_SUCCESS = '[Doctor] Update Success',
    UPDATE_FAIL = '[Doctor] Update Fail',
    DELETE = '[Doctor] Delete',
    DELETE_SUCCESS = '[Doctor] Delete Success',
    DELETE_FAIL = '[Doctor] Delete Fail',
    LOADS = '[Doctor] Loads',
    LOADS_SUCCESS = '[Doctor] Loads Success',
    LOADS_FAIL = '[Doctor] Loads Fail',
    SEARCH = '[Doctor] Search',
    SEARCH_SUCCESS = '[Doctor] Search Success',
    SEARCH_FAIL = '[Doctor] Search Fail',
};

export class AddDoctorAction implements Action {
    type = DoctorActionTypes.ADD;

    constructor(public payload: Doctor) {
    }
}

export class AddDoctorSuccessAction implements Action {
    type = DoctorActionTypes.ADD_SUCCESS;

    constructor(public payload: Doctor) {
    }
}

export class AddDoctorFailAction implements Action {
    type = DoctorActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateDoctorAction implements Action {
    type = DoctorActionTypes.UPDATE;

    constructor(public payload: Doctor) {
    }
}

export class UpdateDoctorSuccessAction implements Action {
    type = DoctorActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Doctor) {
    }
}

export class UpdateDoctorFailAction implements Action {
    type = DoctorActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteDoctorAction implements Action {
    type = DoctorActionTypes.DELETE;

    constructor(public payload: Doctor) {
    }
}

export class DeleteDoctorSuccessAction implements Action {
    type = DoctorActionTypes.DELETE_SUCCESS;

    constructor(public payload: Doctor) {
    }
}

export class DeleteDoctorFailAction implements Action {
    type = DoctorActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadDoctorAction implements Action {
    type = DoctorActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadDoctorSuccessAction implements Action {
    type = DoctorActionTypes.LOADS_SUCCESS;

    constructor(public payload: Doctor[]) {
    }
}

export class LoadDoctorFailAction implements Action {
    type = DoctorActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchDoctorAction implements Action {
    readonly type = DoctorActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchDoctorSuccessAction implements Action {
    readonly type = DoctorActionTypes.SEARCH_SUCCESS;

    constructor(public payload: Doctor[]) { }
}

export class SearchDoctorFailAction implements Action {
    readonly type =DoctorActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type DoctorActions
    = AddDoctorAction
    | AddDoctorSuccessAction
    | AddDoctorFailAction
    | UpdateDoctorAction
    | UpdateDoctorSuccessAction
    | UpdateDoctorFailAction
    | DeleteDoctorAction
    | DeleteDoctorSuccessAction
    | DeleteDoctorFailAction
    | LoadDoctorAction
    | LoadDoctorSuccessAction
    | LoadDoctorFailAction
    | SearchDoctorAction
    | SearchDoctorSuccessAction
    | SearchDoctorFailAction;
