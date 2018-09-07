import { Action } from '@ngrx/store';
import { Project } from '@domain';

export enum ProjectActionTypes {
    ADD = '[Project] Add',
    ADD_SUCCESS = '[Project] Add Success',
    ADD_FAIL = '[Project] Add Fail',
    UPDATE = '[Project] Update',
    UPDATE_SUCCESS = '[Project] Update Success',
    UPDATE_FAIL = '[Project] Update Fail',
    DELETE = '[Project] Delete',
    DELETE_SUCCESS = '[Project] Delete Success',
    DELETE_FAIL = '[Project] Delete Fail',
    LOADS = '[Project] Loads',
    LOADS_SUCCESS = '[Project] Loads Success',
    LOADS_FAIL = '[Project] Loads Fail',
    SEARCH = '[Project] Search',
    SEARCH_SUCCESS = '[Project] Search Success',
    SEARCH_FAIL = '[Project] Search Fail',
};

export class AddProjectAction implements Action {
    type = ProjectActionTypes.ADD;

    constructor(public payload: Project) {
    }
}

export class AddProjectSuccessAction implements Action {
    type = ProjectActionTypes.ADD_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class AddProjectFailAction implements Action {
    type = ProjectActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateProjectAction implements Action {
    type = ProjectActionTypes.UPDATE;

    constructor(public payload: Project) {
    }
}

export class UpdateProjectSuccessAction implements Action {
    type = ProjectActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class UpdateProjectFailAction implements Action {
    type = ProjectActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteProjectAction implements Action {
    type = ProjectActionTypes.DELETE;

    constructor(public payload: Project) {
    }
}

export class DeleteProjectSuccessAction implements Action {
    type = ProjectActionTypes.DELETE_SUCCESS;

    constructor(public payload: Project) {
    }
}

export class DeleteProjectFailAction implements Action {
    type = ProjectActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadProjectAction implements Action {
    type = ProjectActionTypes.LOADS;

    constructor(public payload: any) {
    }
}

export class LoadProjectSuccessAction implements Action {
    type = ProjectActionTypes.LOADS_SUCCESS;

    constructor(public payload: Project[]) {
    }
}

export class LoadProjectFailAction implements Action {
    type = ProjectActionTypes.LOADS_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchProjectAction implements Action {
    readonly type = ProjectActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchProjectSuccessAction implements Action {
    readonly type = ProjectActionTypes.SEARCH_SUCCESS;

    constructor(public payload: Project[]) { }
}

export class SearchProjectFailAction implements Action {
    readonly type = ProjectActionTypes.SEARCH_FAIL;

    constructor(public payload: string) { }
}

export type HospitalActions
    = AddProjectAction
    | AddProjectSuccessAction
    | AddProjectFailAction
    | UpdateProjectAction
    | UpdateProjectSuccessAction
    | UpdateProjectFailAction
    | DeleteProjectAction
    | DeleteProjectSuccessAction
    | DeleteProjectFailAction
    | LoadProjectAction
    | LoadProjectSuccessAction
    | LoadProjectFailAction
    | SearchProjectAction
    | SearchProjectSuccessAction
    | SearchProjectFailAction;
