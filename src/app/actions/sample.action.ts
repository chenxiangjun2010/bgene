import { Action } from '@ngrx/store';
import { Sample } from '@domain';

export enum SampleActionTypes {
    ADD = '[Sample] Add',
    ADD_SUCCESS = '[Sample] Add Success',
    ADD_FAIL = '[Sample] Add Fail',
    UPDATE = '[Sample] Update',
    UPDATE_SUCCESS = '[Sample] Update Success',
    UPDATE_FAIL = '[Sample] Update Fail',
    DELETE = '[Sample] Delete',
    DELETE_SUCCESS = '[Sample] Delete Success',
    DELETE_FAIL = '[Sample] Delete Fail',
    LOADS = '[Sample] Loads',
    LOADS_SUCCESS = '[Sample] Loads Success',
    LOADS_FAIL = '[Sample] Loads Fail',
    SEARCH = '[Sample] Search',
    SEARCH_SUCCESS = '[Sample] Search Success',
    SEARCH_FAIL = '[Sample] Search Fail',
};

export class AddSampleAction implements Action {
    type = SampleActionTypes.ADD;

    constructor(public payload: Sample) {
    }
}

export class AddSampleSuccessAction implements Action {
    type = SampleActionTypes.ADD_SUCCESS;

    constructor(public payload: Sample) {
    }
}

export class AddSampleFailAction implements Action {
    type = SampleActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateSampleAction implements Action {
    type = SampleActionTypes.UPDATE;

    constructor(public payload: Sample) {
    }
}

export class UpdateSampleSuccessAction implements Action {
    type = SampleActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Sample) {
    }
}

export class UpdateSampleFailAction implements Action {
    type = SampleActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteSampleAction implements Action {
    type = SampleActionTypes.DELETE;

    constructor(public payload: Sample) {
    }
}

export class DeleteSampleSuccessAction implements Action {
    type = SampleActionTypes.DELETE_SUCCESS;

    constructor(public payload: Sample) {
    }
}

export class DeleteSampleFailAction implements Action {
    type = SampleActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadSampleAction implements Action {
    type = SampleActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadSampleSuccessAction implements Action {
    type = SampleActionTypes.LOADS_SUCCESS;

    constructor(public payload: Sample[]) {
    }
}

export class LoadSampleFailAction implements Action {
    type = SampleActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchSampleAction implements Action {
    readonly type = SampleActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchSampleSuccessAction implements Action {
    readonly type = SampleActionTypes.SEARCH_SUCCESS;

    constructor(public payload: Sample[]) { }
}

export class SearchSampleFailAction implements Action {
    readonly type = SampleActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type HospitalActions
    = AddSampleAction
    | AddSampleSuccessAction
    | AddSampleFailAction
    | UpdateSampleAction
    | UpdateSampleSuccessAction
    | UpdateSampleFailAction
    | DeleteSampleAction
    | DeleteSampleSuccessAction
    | DeleteSampleFailAction
    | LoadSampleAction
    | LoadSampleSuccessAction
    | LoadSampleFailAction
    | SearchSampleAction
    | SearchSampleSuccessAction
    | SearchSampleFailAction;
