import { Action } from '@ngrx/store';
import { IceBox } from '@domain';

export enum IceBoxActionTypes {
    ADD = '[IceBox] Add',
    ADD_SUCCESS = '[IceBox] Add Success',
    ADD_FAIL = '[IceBox] Add Fail',
    UPDATE = '[IceBox] Update',
    UPDATE_SUCCESS = '[IceBox] Update Success',
    UPDATE_FAIL = '[IceBox] Update Fail',
    DELETE = '[IceBox] Delete',
    DELETE_SUCCESS = '[IceBox] Delete Success',
    DELETE_FAIL = '[IceBox] Delete Fail',
    LOADS = '[IceBox] Loads',
    LOADS_SUCCESS = '[IceBox] Loads Success',
    LOADS_FAIL = '[IceBox] Loads Fail',
    SEARCH = '[IceBox] Search',
    SEARCH_SUCCESS = '[IceBox] Search Success',
    SEARCH_FAIL = '[IceBox] Search Fail',
};

export class AddIceBoxAction implements Action {
    type = IceBoxActionTypes.ADD;

    constructor(public payload: IceBox) {
    }
}

export class AddIceBoxSuccessAction implements Action {
    type = IceBoxActionTypes.ADD_SUCCESS;

    constructor(public payload: IceBox) {
    }
}

export class AddIceBoxFailAction implements Action {
    type = IceBoxActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateIceBoxAction implements Action {
    type = IceBoxActionTypes.UPDATE;

    constructor(public payload: IceBox) {
    }
}

export class UpdateIceBoxSuccessAction implements Action {
    type = IceBoxActionTypes.UPDATE_SUCCESS;

    constructor(public payload: IceBox) {
    }
}

export class UpdateIceBoxFailAction implements Action {
    type = IceBoxActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteIceBoxAction implements Action {
    type = IceBoxActionTypes.DELETE;

    constructor(public payload: IceBox) {
    }
}

export class DeleteIceBoxSuccessAction implements Action {
    type = IceBoxActionTypes.DELETE_SUCCESS;

    constructor(public payload: IceBox) {
    }
}

export class DeleteIceBoxFailAction implements Action {
    type = IceBoxActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadIceBoxAction implements Action {
    type = IceBoxActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadIceBoxSuccessAction implements Action {
    type = IceBoxActionTypes.LOADS_SUCCESS;

    constructor(public payload: IceBox[]) {
    }
}

export class LoadIceBoxFailAction implements Action {
    type = IceBoxActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchIceBoxAction implements Action {
    readonly type = IceBoxActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchIceBoxSuccessAction implements Action {
    readonly type = IceBoxActionTypes.SEARCH_SUCCESS;

    constructor(public payload: IceBox[]) { }
}

export class SearchIceBoxFailAction implements Action {
    readonly type = IceBoxActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type HospitalActions
    = AddIceBoxAction
    | AddIceBoxSuccessAction
    | AddIceBoxFailAction
    | UpdateIceBoxAction
    | UpdateIceBoxSuccessAction
    | UpdateIceBoxFailAction
    | DeleteIceBoxAction
    | DeleteIceBoxSuccessAction
    | DeleteIceBoxFailAction
    | LoadIceBoxAction
    | LoadIceBoxSuccessAction
    | LoadIceBoxFailAction
    | SearchIceBoxAction
    | SearchIceBoxSuccessAction
    | SearchIceBoxFailAction;
