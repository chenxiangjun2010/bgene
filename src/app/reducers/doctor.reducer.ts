import * as actions from '../actions/doctor.action';
import { covertArrToObj, deleteOne, loadCollection } from '../utils/reducer.utils';
import { createSelector } from '@ngrx/store';
import { Doctor } from '@domain';

export interface State {
    ids: string[];
    entities: { [id: string]: Doctor };
    totalElement: number;
}

export const initialState: State = {
    ids: [],
    entities: {},
    totalElement:0
};

const addDoctor = (state, action) => {
    const doctor = action.payload;
    if (state.entities[doctor.id]) {
        return state;
    }
    const ids = [...state.ids, doctor.id];
    const entities = { ...state.entities, [doctor.id]: doctor };
    return { ...state, ids: ids, entities: entities };
};

const delDoctor = (state, action) => {
    return deleteOne(state, action.payload);
};

const updateDoctor = (state, action) => {
    const doctor = action.payload;
    const entities = { ...state.entities, [doctor.id]: doctor };
    return { ...state, entities: entities };
};

const loadDoctors = (state, action) => {
   const doctors = <Doctor[]>action.payload.content;
   const totalElements = action.payload.totalElements;
   if (doctors === null) {
       return state;
   }
   const newIds = doctors.map(doctor => doctor.id);
   if (newIds.length === 0) {
       return state;
   }
   const newEntities = covertArrToObj(doctors);
   return {
       ids: [...newIds],
       entities: { ...newEntities },
       totalElements:totalElements
   };

};


export function reducer(state = initialState, action: actions.DoctorActions): State {
    switch (action.type) {
        case actions.DoctorActionTypes.ADD_SUCCESS:
            return addDoctor(state, action);
        case actions.DoctorActionTypes.DELETE_SUCCESS:
            return delDoctor(state, action);
        case actions.DoctorActionTypes.UPDATE_SUCCESS:
            return updateDoctor(state, action);
        case actions.DoctorActionTypes.LOADS_SUCCESS:
            return loadDoctors(state, action);
        case actions.DoctorActionTypes.SEARCH_SUCCESS:
            return loadDoctors(state, action);
        case actions.DoctorActionTypes.SEARCH_FAIL:
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
