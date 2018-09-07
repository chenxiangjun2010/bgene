import { Auth } from '@domain';
import * as actions from '../actions/auth.action';

export const initialState: Auth = {};

export function reducer(state: Auth = initialState, action: actions.AuthActionsUnion): Auth {
    switch (action.type) {
        case actions.AuthActionTypes.LOGIN_SUCCESS: {
            return <Auth>action.payload;
        }
        case actions.AuthActionTypes.LOGIN_FAIL: {
            return action.payload;
        }
        case actions.AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export const getAuth = (state: Auth) => state;
