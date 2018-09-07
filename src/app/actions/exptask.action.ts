import { Action } from '@ngrx/store';
import { ExpTask } from '@domain';

export enum ExpTaskActionTypes {
    ADD = '[ExpTask] Add',
    ADD_SUCCESS = '[ExpTask] Add Success',
    ADD_FAIL = '[ExpTask] Add Fail',
    UPDATE = '[ExpTask] Update',
    UPDATE_SUCCESS = '[ExpTask] Update Success',
    UPDATE_FAIL = '[ExpTask] Update Fail',
    DELETE = '[ExpTask] Delete',
    DELETE_SUCCESS = '[ExpTask] Delete Success',
    DELETE_FAIL = '[ExpTask] Delete Fail',
    LOADS = '[ExpTask] Loads',
    LOADS_SUCCESS = '[ExpTask] Loads Success',
    LOADS_FAIL = '[ExpTask] Loads Fail',
    SEARCH = '[ExpTask] Search',
    SEARCH_SUCCESS = '[ExpTask] Search Success',
    SEARCH_FAIL = '[ExpTask] Search Fail',
};

export class AddExpTaskAction implements Action {
    type = ExpTaskActionTypes.ADD;

    constructor(public payload: ExpTask) {
    }
}

export class AddExpTaskSuccessAction implements Action {
    type = ExpTaskActionTypes.ADD_SUCCESS;

    constructor(public payload: ExpTask) {
    }
}

export class AddExpTaskFailAction implements Action {
    type = ExpTaskActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateExpTaskAction implements Action {
    type = ExpTaskActionTypes.UPDATE;

    constructor(public payload: ExpTask) {
    }
}

export class UpdateExpTaskSuccessAction implements Action {
    type = ExpTaskActionTypes.UPDATE_SUCCESS;

    constructor(public payload: ExpTask) {
    }
}

export class UpdateExpTaskFailAction implements Action {
    type = ExpTaskActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteExpTaskAction implements Action {
    type = ExpTaskActionTypes.DELETE;

    constructor(public payload: ExpTask) {
    }
}

export class DeleteExpTaskSuccessAction implements Action {
    type = ExpTaskActionTypes.DELETE_SUCCESS;

    constructor(public payload: ExpTask) {
    }
}

export class DeleteExpTaskFailAction implements Action {
    type = ExpTaskActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadExpTaskAction implements Action {
    type = ExpTaskActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadExpTaskSuccessAction implements Action {
    type = ExpTaskActionTypes.LOADS_SUCCESS;

    constructor(public payload: ExpTask[]) {
    }
}

export class LoadExpTaskFailAction implements Action {
    type = ExpTaskActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchExpTaskAction implements Action {
    readonly type = ExpTaskActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchExpTaskSuccessAction implements Action {
    readonly type = ExpTaskActionTypes.SEARCH_SUCCESS;

    constructor(public payload: ExpTask[]) { }
}

export class SearchExpTaskFailAction implements Action {
    readonly type = ExpTaskActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type ExpTaskActions
    = AddExpTaskAction
    | AddExpTaskSuccessAction
    | AddExpTaskFailAction
    | UpdateExpTaskAction
    | UpdateExpTaskSuccessAction
    | UpdateExpTaskFailAction
    | DeleteExpTaskAction
    | DeleteExpTaskSuccessAction
    | DeleteExpTaskFailAction
    | LoadExpTaskAction
    | LoadExpTaskSuccessAction
    | LoadExpTaskFailAction
    | SearchExpTaskAction
    | SearchExpTaskSuccessAction
    | SearchExpTaskFailAction;
