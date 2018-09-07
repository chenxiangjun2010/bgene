import * as _ from 'lodash';

export const covertArrToObj = (arr) => {
    return arr.reduce((entities, obj) => ({ ...entities, [obj.id]: obj }), {});
};

export const buildObjFromArr = (arr, dict) => {
    return arr.reduce((entities, id) => ({ ...entities, [id]: dict[id] }), {});
};

export const loadCollection = (state, collection) => {
    const newItems = collection;
    const newIds = newItems.map(item => item.id);
    const newEntities = covertArrToObj(newItems);
    return {
        ids: newIds,
        entities: newEntities
    };
};

export const updateOne = (state, updated) => {
    const entities = { ...state.entities, [updated.id]: updated };
    return { ...state, entities: entities };
};

export const deleteOne = (state, deleted) => {
    const newIds = state.ids.filter(id => id !== deleted.id);
    if (newIds.length === state.ids.length) {
        return state;
    }
    const newEntities = buildObjFromArr(newIds, state.entities);
    return { ids: newIds, entities: newEntities }
};

export const addOne = (state, added) => {
    const newIds = [...state.ids, added.id];
    const newEntities = { ...state.entities, [added.id]: added };
    return { ids: newIds, entities: newEntities };
};

export const batchDel = (state, deleted) => {
    const deletedId = deleted.map(deleted => deleted.id);
    const newIds = _.difference(state.ids, deletedId);
    if (newIds.length === state.ids.length) {
        return state;
    }
    const newEntities = buildObjFromArr(newIds, state.entities);
    return {
        ids: newIds,
        entities: newEntities
    };
};


