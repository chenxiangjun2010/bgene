import { User } from '@domain';
import * as actions from '../actions/sysuser.action';
import { covertArrToObj, batchDel, deleteOne } from '../utils/reducer.utils';
import { createSelector } from '@ngrx/store';

export interface State {
    ids: string[];
    entities: { [id: string]: User };
}

export const initialState: State = {
    ids: [],
    entities: {},
};

const loadUsers = (state, action) => {
    const users = action.payload;
    if (users === null) {
        return state;
    }
    if (users.length === 0) {
        return state;
    }
    const newIds = users.map(user => user.id);
    const newEntities = covertArrToObj(users);
    return {
        ids: [...newIds],
        entities: { ...newEntities },
    };
};

const addUsers = (state, action) => {
    const user = action.payload;
    if (state.entities[user.id]) {
        return state;
    }
    const ids = [...state.ids, user.id];
    const entities = { ...state.entities, [user.id]: user };
    return { ...state, ids: ids, entities: entities };
};

const delUser = (state, action) => {
    return deleteOne(state, action.payload);
};

const updateUser = (state, action) => {
    const user = action.payload;
    const entities = { ...state.entities, [user.id]: user };
    return { ...state, entities: entities };
};

const batchDelUsers = (state, action) => {
    return batchDel(state, action.payload);
};

const searchUsers = (state, action) => {
    const users = <User[]>action.payload;
    if (users === null) {
        return state;
    }
    const newIds = users.map(user => user.id);
    if (newIds.length === 0) {
        return state;
    }
    const newEntities = covertArrToObj(users);
    return {
        ids: [...newIds],
        entities: { ...newEntities }
    };
};

export function reducer(state = initialState, action: actions.SysUserActions): State {
    switch (action.type) {
        case actions.SysUserActionTypes.LOADS_SUCCESS:
            return loadUsers(state, action);
        case actions.SysUserActionTypes.ADD_SUCCESS:
            return addUsers(state, action);
        case actions.SysUserActionTypes.UPDATE_SUCCESS:
            return updateUser(state, action);
        case actions.SysUserActionTypes.DELETE_SUCCESS:
            return delUser(state, action);
        case actions.SysUserActionTypes.BATCHDEL_SUCCESS:
            return batchDelUsers(state, action);
        case actions.SysUserActionTypes.SEARCH_SUCCESS:
            return searchUsers(state, action);
        case actions.SysUserActionTypes.SEARCH_FAIL:
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
