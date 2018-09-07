import { Hospital } from '@domain';
import * as actions from '../actions/hospital.action';
import { covertArrToObj, deleteOne } from '../utils/reducer.utils';
import { createSelector } from '@ngrx/store';

export interface State {
    ids: string[];
    entities: { [id: string]: Hospital };
}

export const initialState: State = {
    ids: [],
    entities: {},
};

const addHospital = (state, action) => {
    const hospital = action.payload;
    if (state.entities[hospital.id]) {
        return state;
    }
    const ids = [...state.ids, hospital.id];
    const entities = { ...state.entities, [hospital.id]: hospital };
    return { ...state, ids: ids, entities: entities };
};

const delHospital = (state, action) => {
    return deleteOne(state, action.payload);
};

const updateHospital = (state, action) => {
    const hospital = action.payload;
    const entities = { ...state.entities, [hospital.id]: hospital };
    return { ...state, entities: entities };
};

const loadHospitals = (state, action) => {
    const hospitals = <Hospital[]>action.payload;
    if (hospitals === null) {
        return state;
    }
    const newIds = hospitals.map(hospital => hospital.id);
    if (newIds.length === 0) {
        return state;
    }
    const newEntities = covertArrToObj(hospitals);
    return {
        ids: [...newIds],
        entities: { ...newEntities }
    };

};

// const searchHospitals = (state, action) => {
//     const hospitals = <Hospital[]>action.payload;
//     if (hospitals === null) {
//         return state;
//     }
//     const newIds = hospitals.map(hospital => hospital.id);
//     if (newIds.length === 0) {
//         return state;
//     }
//     const newEntities = covertArrToObj(hospitals);
//     return {
//         ids: [...newIds],
//         entities: { ...newEntities }
//     };
// };

export function reducer(state = initialState, action: actions.HospitalActions): State {
    switch (action.type) {
        case actions.HospitalActionTypes.ADD_SUCCESS:
            return addHospital(state, action);
        case actions.HospitalActionTypes.DELETE_SUCCESS:
            return delHospital(state, action);
        case actions.HospitalActionTypes.UPDATE_SUCCESS:
            return updateHospital(state, action);
        case actions.HospitalActionTypes.LOADS_SUCCESS:
            return loadHospitals(state, action);
        case actions.HospitalActionTypes.SEARCH_SUCCESS:
            return loadHospitals(state, action);
        case actions.HospitalActionTypes.SEARCH_FAIL:
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
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
