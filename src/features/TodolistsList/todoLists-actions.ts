import {createAsyncThunk} from '@reduxjs/toolkit';
import {RESULT_CODES, todoListAPI, TodoListType} from '../../api/api';
import {setAppStatusAC} from '../../app/app-reducer';
import axios from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils/errors-utils';
import {changesTodoStatusAC} from './todoList-reducer';

export const getTodoListTC = createAsyncThunk<TodoListType[]>('todolist/getTodoList', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListAPI.getTodoList()
        dispatch(setAppStatusAC({status: "succeeded"}))
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
        }
        return rejectWithValue(null)
    }
})
export const deleteTodoListTC = createAsyncThunk<{ todolistId: string }, { todolistId: string }>('todolist/deleteToDoListTC', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changesTodoStatusAC({todolistId: param.todolistId, entityStatus: "loading"}))
    try {
        const res = await todoListAPI.deleteTodoList(param.todolistId)
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolistId: param.todolistId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
        }
        return rejectWithValue(null)
    } finally {
        dispatch(changesTodoStatusAC({todolistId: param.todolistId, entityStatus: "succeeded"}))
    }
})
export const createTodoListTC = createAsyncThunk<TodoListType, { titleValue: string }>('todolist/createToDoList', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListAPI.createTodoList(param.titleValue)
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            // dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
        }
        return rejectWithValue(null)
    }
})
export const updateTodoListTC = createAsyncThunk<{ todolistId: string, title: string }, { todolistId: string, title: string }>('todolist/updateToDoList', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListAPI.updateTodoLists(param.todolistId, param.title)
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolistId: param.todolistId, title: param.title}

        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
        }
        return rejectWithValue(null)
    } finally {
        dispatch(changesTodoStatusAC({todolistId: param.todolistId, entityStatus: "succeeded"}))
    }
})