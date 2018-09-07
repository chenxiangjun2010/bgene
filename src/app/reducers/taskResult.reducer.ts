import { TaskResult } from '@domain';
import * as actions from '../actions/taskResult.action';
import { covertArrToObj, batchDel, deleteOne } from '../utils/reducer.utils';
import { createSelector } from '@ngrx/store';

export interface State {
    ids: string[];
    entities: { [id: string]: TaskResult };
}

export const initialState: State = {
    ids: [],
    entities: {},
};

const loadTaskResult = (state, action) => {
    const taskResult = action.payload;
    if (taskResult === null) {
        return state;
    }
    if (taskResult.length === 0) {
        return state;
    }
    const newIds = taskResult.map(taskResult => taskResult.id);
    const newEntities = covertArrToObj(taskResult);
    return {
        ids: [...newIds],
        entities: { ...newEntities },
    };
};

const addTaskResult = (state, action) => {
    const taskResult = action.payload;
    if (state.entities[taskResult.id]) {
        return state;
    }
    const ids = [...state.ids, taskResult.id];
    const entities = { ...state.entities, [taskResult.id]: taskResult };
    return { ...state, ids: ids, entities: entities };
};

const delTaskResult = (state, action) => {
    return deleteOne(state, action.payload);
};

const updateTaskResult = (state, action) => {
    const taskResult = action.payload;
    const entities = { ...state.entities, [taskResult.id]: taskResult };
    return { ...state, entities: entities };
};

const batchDeltaskResult = (state, action) => {
    return batchDel(state, action.payload);
};

const searchTaskResult = (state, action) => {
    const taskResult = <TaskResult[]>action.payload;
    if (taskResult === null) {
        return state;
    }
    const newIds = taskResult.map(taskResult => taskResult.id);
    if (newIds.length === 0) {
        return state;
    }
    const newEntities = covertArrToObj(taskResult);
    return {
        ids: [...newIds],
        entities: { ...newEntities }
    };
};

export function reducer(state = initialState, action: actions.TaskResultActions): State {
    switch (action.type) {
        case actions.TaskResultActionTypes.LOADS_SUCCESS:
            return loadTaskResult(state, action);
        case actions.TaskResultActionTypes.ADD_SUCCESS:
            return addTaskResult(state, action);
        case actions.TaskResultActionTypes.UPDATE_SUCCESS:
            return updateTaskResult(state, action);
        case actions.TaskResultActionTypes.DELETE_SUCCESS:
            return delTaskResult(state, action);
        case actions.TaskResultActionTypes.SEARCH_SUCCESS:
            return searchTaskResult(state, action);
        case actions.TaskResultActionTypes.SEARCH_FAIL:
            return initialState;
        default: return state;
    }
}
export const getEntities = (state) => state.entities;
export const getSelectedId = (state) => state.selectedId;
export const getIds = (state) => state.ids;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
