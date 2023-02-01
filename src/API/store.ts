import {applyMiddleware, combineReducers,  legacy_createStore as createStore} from "redux";
import tasksReducer, {TasksActionType} from "../features/TodolistsList/tasks-reducer";
import todolistsReducer, {TodolistsActionType} from "../features/TodolistsList/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

// export  type  AppRootState = ReturnType<typeof rootReducer>
export  type  AppRootState = ReturnType<typeof store.getState>

//types all action for App
 export type AppActionType = TodolistsActionType | TasksActionType

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionType>

//universal thunk types
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionType>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// applyMiddleware(thunkMiddleware) if prichodit action, on ee propuskaet in reducer,
// a esli thunk to zapuskaet etu func.

