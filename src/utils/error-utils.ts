import {AppActionType, InitialStateType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType, TaskType} from "../API/todolists-api";
import {ThunkDispatch} from "redux-thunk";
import {Dispatch, EmptyObject} from "redux";
import {
    AddTodolistActionType,
    RemoveTodolistActionType, SetTodolistsActionType,
    TodolistDomainType
} from "../features/TodolistsList/todolists-reducer";
import {TaskStateType} from "../trash/AppWithReducer";
import {UpdateDomainTaskModelType} from "../features/TodolistsList/tasks-reducer";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))//
}
export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occured'))//esl error, to then ne rabotaet
    dispatch(setAppStatusAC('failed'))//
}