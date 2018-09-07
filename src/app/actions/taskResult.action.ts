import { Action } from '@ngrx/store';
import { TaskResult } from '@domain';

export enum TaskResultActionTypes {
    ADD = '[TaskResult] Add',
    ADD_SUCCESS = '[TaskResult] Add Success',
    ADD_FAIL = '[TaskResult] Add Fail',
    UPDATE = '[TaskResult] Update',
    UPDATE_SUCCESS = '[TaskResult] Update Success',
    UPDATE_FAIL = '[TaskResult] Update Fail',
    DELETE = '[TaskResult] Delete',
    DELETE_SUCCESS = '[TaskResult] Delete Success',
    DELETE_FAIL = '[TaskResult] Delete Fail',
    LOADS = '[TaskResult] Loads',
    LOADS_SUCCESS = '[TaskResult] Loads Success',
    LOADS_FAIL = '[TaskResult] Loads Fail',
    SEARCH = '[TaskResult] Search',
    SEARCH_SUCCESS = '[TaskResult] Search Success',
    SEARCH_FAIL = '[TaskResult] Search Fail',
};

export class AddTaskResultAction implements Action {
    type = TaskResultActionTypes.ADD;

    constructor(public payload: TaskResult) {
    }
}

export class AddTaskResultSuccessAction implements Action {
    type = TaskResultActionTypes.ADD_SUCCESS;

    constructor(public payload: TaskResult) {
    }
}

export class AddTaskResultFailAction implements Action {
    type = TaskResultActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateTaskResultAction implements Action {
    type = TaskResultActionTypes.UPDATE;

    constructor(public payload: TaskResult) {
    }
}

export class UpdateTaskResultSuccessAction implements Action {
    type = TaskResultActionTypes.UPDATE_SUCCESS;

    constructor(public payload: TaskResult) {
    }
}

export class UpdateTaskResultFailAction implements Action {
    type = TaskResultActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteTaskResultAction implements Action {
    type = TaskResultActionTypes.DELETE;

    constructor(public payload: TaskResult) {
    }
}

export class DeleteTaskResultSuccessAction implements Action {
    type = TaskResultActionTypes.DELETE_SUCCESS;

    constructor(public payload: TaskResult) {
    }
}

export class DeleteTaskResultFailAction implements Action {
    type = TaskResultActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadTaskResultAction implements Action {
    type = TaskResultActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadTaskResultSuccessAction implements Action {
    type = TaskResultActionTypes.LOADS_SUCCESS;

    constructor(public payload: TaskResult[]) {
    }
}

export class LoadTaskResultFailAction implements Action {
    type = TaskResultActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchTaskResultAction implements Action {
    readonly type = TaskResultActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchTaskResultSuccessAction implements Action {
    readonly type = TaskResultActionTypes.SEARCH_SUCCESS;

    constructor(public payload: TaskResult[]) { }
}

export class SearchTaskResultFailAction implements Action {
    readonly type = TaskResultActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type TaskResultActions
    = AddTaskResultAction
    | AddTaskResultSuccessAction
    | AddTaskResultFailAction
    | UpdateTaskResultAction
    | UpdateTaskResultSuccessAction
    | UpdateTaskResultFailAction
    | DeleteTaskResultAction
    | DeleteTaskResultSuccessAction
    | DeleteTaskResultFailAction
    | LoadTaskResultAction
    | LoadTaskResultSuccessAction
    | LoadTaskResultFailAction
    | SearchTaskResultAction
    | SearchTaskResultSuccessAction
    | SearchTaskResultFailAction;
