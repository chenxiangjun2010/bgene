import { environment } from '@env/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromAuth from './auth.reducer';
import * as fromHospitals from './hospital.reducer';
import * as fromUser from "./sysuser.reducer";
import * as fromDepartments from './department.reducer';
import { Auth } from '@domain';
import { ActionReducer, ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';

export interface State {
    auth: Auth;
    hospitals: fromHospitals.State;
    users: fromUser.State;
    departments: fromDepartments.State;
};

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    hospitals: fromHospitals.reducer,
    users: fromUser.reducer,
    departments: fromDepartments.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];

export const getAuthState = (state: State) => state.auth;
export const getHospitalsState = (state: State) => state.hospitals;
export const getUsersState = (state: State) => state.users;
export const getDepartmentsState = (state: State) => state.departments;

export const getHospitals = createSelector(getHospitalsState, fromHospitals.getAll);
export const getUsers = createSelector(getUsersState, fromUser.getAll);
export const getDepartments = createSelector(getDepartmentsState, fromDepartments.getAll);


