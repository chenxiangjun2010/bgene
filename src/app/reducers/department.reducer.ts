import * as actions from '../actions/department.action';
import { covertArrToObj, deleteOne, loadCollection } from '../utils/reducer.utils';
import { createSelector } from '@ngrx/store';
import { Department } from '@domain';

export interface State {
    ids: string[];
    entities: { [id: string]: Department };
    totalElement: number;
}

export const initialState: State = {
    ids: [],
    entities: {},
    totalElement:0
};

const addDepartment = (state, action) => {
    const department = action.payload;
    if (state.entities[department.id]) {
        return state;
    }
    const ids = [...state.ids, department.id];
    const entities = { ...state.entities, [department.id]: department };
    return { ...state, ids: ids, entities: entities };
};

const delDepartment = (state, action) => {
    return deleteOne(state, action.payload);
};

const updateDepartment = (state, action) => {
    const department = action.payload;
    const entities = { ...state.entities, [department.id]: department };
    return { ...state, entities: entities };
};

const loadDepartments = (state, action) => {
   const departments = <Department[]>action.payload.content;
   const totalElements = action.payload.totalElements;
   if (departments === null) {
       return state;
   }
   const newIds = departments.map(department => department.id);
   if (newIds.length === 0) {
       return state;
   }
   const newEntities = covertArrToObj(departments);
   return {
       ids: [...newIds],
       entities: { ...newEntities },
       totalElements:totalElements
   };

};


export function reducer(state = initialState, action: actions.DepartmentActions): State {
    switch (action.type) {
        case actions.DepartmentActionTypes.ADD_SUCCESS:
            return addDepartment(state, action);
        case actions.DepartmentActionTypes.DELETE_SUCCESS:
            return delDepartment(state, action);
        case actions.DepartmentActionTypes.UPDATE_SUCCESS:
            return updateDepartment(state, action);
        case actions.DepartmentActionTypes.LOADS_SUCCESS:
            return loadDepartments(state, action);
        case actions.DepartmentActionTypes.SEARCH_SUCCESS:
            return loadDepartments(state, action);
        case actions.DepartmentActionTypes.SEARCH_FAIL:
            return initialState;
        default:
            return state;
    }
}

export const getEntities = (state) => state.entities;
export const getSelectedId = (state) => state.selectedId;
export const getIds = (state) => state.ids;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});
export const getTotalElements = (state) => state.totalElements;
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
