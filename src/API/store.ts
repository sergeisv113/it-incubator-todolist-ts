import {applyMiddleware, combineReducers,  legacy_createStore as createStore} from "redux";
import tasksReducer, {TasksActionType} from "../features/TodolistsList/tasks-reducer";
import todolistsReducer, {TodolistsActionType} from "../features/TodolistsList/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionType, appReducer} from "../app/app-reducer";
import { LoginActionType, loginReducer} from "../features/login/login-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer
})

// export  type  AppRootState = ReturnType<typeof rootReducer>
export  type  AppRootState = ReturnType<typeof store.getState>

//types all action for App
 export type AppAllActionType = TodolistsActionType
     | TasksActionType
     | AppActionType
     |  LoginActionType

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppAllActionType>

//universal thunk types
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppAllActionType>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// applyMiddleware(thunkMiddleware) if prichodit action, on ee propuskaet in reducer,
// a esli thunk to zapuskaet etu func.

