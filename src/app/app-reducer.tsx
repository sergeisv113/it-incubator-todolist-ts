import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "../features/login/login-reducer";
import {loginAPI} from "../API/todolists-api";

const initialState: InitialStateType = {
    status: 'idle',
   // error: 'Some error'
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error: error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status: status} as const)
export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized: isInitialized} as const)

export const initializeAppTC = () => (dispatch : Dispatch) => {
    loginAPI.me()// me=server
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
        })
}


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>

export type AppActionType =
    SetAppErrorActionType | SetAppStatusActionType | SetAppInitializedActionType


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    //proischodit li seychas vzaemodejstvie s serverom
    status: 'idle' | 'loading' | 'succeeded' | 'failed',

    //esli error kakaja-to globalnaja => text error sjuda
    error: string | null
    isInitialized: boolean//true kogda proinicialisirovalos
}