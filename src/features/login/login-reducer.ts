import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {loginAPI, LoginParamsType} from "../../API/todolists-api";

import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppThunkType} from "../../API/store";



export type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk creator

export const loginTC = (data: LoginParamsType): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))// pokaz progress zagruzki
    loginAPI.login(data)
        .then(res =>  {
            if (res.data.resultCode === 0) { //otvet server
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))// ne pokaz progress zagruzki
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))// pokaz progress zagruzki
    loginAPI.logout()
        .then(res =>  {
            if (res.data.resultCode === 0) { //otvet server
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))// ne pokaz progress zagruzki
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export type SetIsLoggedIn = ReturnType<typeof setIsLoggedInAC>
export type LoginActionType = SetIsLoggedIn | SetAppErrorActionType | SetAppStatusActionType