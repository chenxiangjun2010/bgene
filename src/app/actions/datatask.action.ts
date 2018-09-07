import { Action } from '@ngrx/store';
import { DataTask } from '@domain';

export enum DataTaskActionTypes {
    ADD = '[DataTask] Add',
    ADD_SUCCESS = '[DataTask] Add Success',
    ADD_FAIL = '[DataTask] Add Fail',
    UPDATE = '[DataTask] Update',
    UPDATE_SUCCESS = '[DataTask] Update Success',
    UPDATE_FAIL = '[DataTask] Update Fail',
    DELETE = '[DataTask] Delete',
    DELETE_SUCCESS = '[DataTask] Delete Success',
    DELETE_FAIL = '[DataTask] Delete Fail',
    LOADS = '[DataTask] Loads',
    LOADS_SUCCESS = '[DataTask] Loads Success',
    LOADS_FAIL = '[DataTask] Loads Fail',
    SEARCH = '[DataTask] Search',
    SEARCH_SUCCESS = '[DataTask] Search Success',
    SEARCH_FAIL = '[DataTask] Search Fail',
};

export class AddDataTaskAction implements Action {
    type = DataTaskActionTypes.ADD;

    constructor(public payload: DataTask) {
    }
}

export class AddDataTaskSuccessAction implements Action {
    type = DataTaskActionTypes.ADD_SUCCESS;

    constructor(public payload: DataTask) {
    }
}

export class AddDataTaskFailAction implements Action {
    type = DataTaskActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateDataTaskAction implements Action {
    type = DataTaskActionTypes.UPDATE;

    constructor(public payload: DataTask) {
    }
}

export class UpdateDataTaskSuccessAction implements Action {
    type = DataTaskActionTypes.UPDATE_SUCCESS;

    constructor(public payload: DataTask) {
    }
}

export class UpdateDataTaskFailAction implements Action {
    type = DataTaskActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteDataTaskAction implements Action {
    type = DataTaskActionTypes.DELETE;

    constructor(public payload: DataTask) {
    }
}

export class DeleteDataTaskSuccessAction implements Action {
    type = DataTaskActionTypes.DELETE_SUCCESS;

    constructor(public payload: DataTask) {
    }
}

export class DeleteDataTaskFailAction implements Action {
    type = DataTaskActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadDataTaskAction implements Action {
    type = DataTaskActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadDataTaskSuccessAction implements Action {
    type = DataTaskActionTypes.LOADS_SUCCESS;

    constructor(public payload: DataTask[]) {
    }
}

export class LoadDataTaskFailAction implements Action {
    type = DataTaskActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchDataTaskAction implements Action {
    readonly type = DataTaskActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchDataTaskSuccessAction implements Action {
    readonly type = DataTaskActionTypes.SEARCH_SUCCESS;

    constructor(public payload: DataTask[]) { }
}

export class SearchDataTaskFailAction implements Action {
    readonly type = DataTaskActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type ExpTaskActions
    = AddDataTaskAction
    | AddDataTaskSuccessAction
    | AddDataTaskFailAction
    | UpdateDataTaskAction
    | UpdateDataTaskSuccessAction
    | UpdateDataTaskFailAction
    | DeleteDataTaskAction
    | DeleteDataTaskSuccessAction
    | DeleteDataTaskFailAction
    | LoadDataTaskAction
    | LoadDataTaskSuccessAction
    | LoadDataTaskFailAction
    | SearchDataTaskAction
    | SearchDataTaskSuccessAction
    | SearchDataTaskFailAction;
