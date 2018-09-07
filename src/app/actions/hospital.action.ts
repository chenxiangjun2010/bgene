import { Action } from '@ngrx/store';
import { Hospital } from '@domain';

export enum HospitalActionTypes {
    ADD = '[Hospital] Add',
    ADD_SUCCESS = '[Hospital] Add Success',
    ADD_FAIL = '[Hospital] Add Fail',
    UPDATE = '[Hospital] Update',
    UPDATE_SUCCESS = '[Hospital] Update Success',
    UPDATE_FAIL = '[Hospital] Update Fail',
    DELETE = '[Hospital] Delete',
    DELETE_SUCCESS = '[Hospital] Delete Success',
    DELETE_FAIL = '[Hospital] Delete Fail',
    LOADS = '[Hospital] Loads',
    LOADS_SUCCESS = '[Hospital] Loads Success',
    LOADS_FAIL = '[Hospital] Loads Fail',
    SEARCH = '[Hospital] Search',
    SEARCH_SUCCESS = '[Hospital] Search Success',
    SEARCH_FAIL = '[Hospital] Search Fail',
};

export class AddHospitalAction implements Action {
    type = HospitalActionTypes.ADD;

    constructor(public payload: Hospital) {
    }
}

export class AddHospitalSuccessAction implements Action {
    type = HospitalActionTypes.ADD_SUCCESS;

    constructor(public payload: Hospital) {
    }
}

export class AddHospitalFailAction implements Action {
    type = HospitalActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateHospitalAction implements Action {
    type = HospitalActionTypes.UPDATE;

    constructor(public payload: Hospital) {
    }
}

export class UpdateHospitalSuccessAction implements Action {
    type = HospitalActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Hospital) {
    }
}

export class UpdateHospitalFailAction implements Action {
    type = HospitalActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteHospitalAction implements Action {
    type = HospitalActionTypes.DELETE;

    constructor(public payload: Hospital) {
    }
}

export class DeleteHospitalSuccessAction implements Action {
    type = HospitalActionTypes.DELETE_SUCCESS;

    constructor(public payload: Hospital) {
    }
}

export class DeleteHospitalFailAction implements Action {
    type = HospitalActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadHospitalAction implements Action {
    type = HospitalActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadHospitalSuccessAction implements Action {
    type = HospitalActionTypes.LOADS_SUCCESS;

    constructor(public payload: Hospital[]) {
    }
}

export class LoadHospitalFailAction implements Action {
    type = HospitalActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchHospitalAction implements Action {
    readonly type = HospitalActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchHospitalSuccessAction implements Action {
    readonly type = HospitalActionTypes.SEARCH_SUCCESS;

    constructor(public payload: Hospital[]) { }
}

export class SearchHospitalFailAction implements Action {
    readonly type = HospitalActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type HospitalActions
    = AddHospitalAction
    | AddHospitalSuccessAction
    | AddHospitalFailAction
    | UpdateHospitalAction
    | UpdateHospitalSuccessAction
    | UpdateHospitalFailAction
    | DeleteHospitalAction
    | DeleteHospitalSuccessAction
    | DeleteHospitalFailAction
    | LoadHospitalAction
    | LoadHospitalSuccessAction
    | LoadHospitalFailAction
    | SearchHospitalAction
    | SearchHospitalSuccessAction
    | SearchHospitalFailAction;
