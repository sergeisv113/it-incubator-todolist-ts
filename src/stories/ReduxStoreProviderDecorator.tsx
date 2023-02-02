import React from "react";
import {Provider} from "react-redux";
import {AppRootState, store} from "../API/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import tasksReducer from "../features/TodolistsList/tasks-reducer";
import todolistsReducer from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/todolists-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})
const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: "What to buy", filter: 'all',entityStatus: "idle", order: 0, addedDate: '',},
        {id: 'todolistId2', title: "What to learn" , filter: 'all',entityStatus: "loading" , order: 0, addedDate: ''}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi},
            {id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Middle},
        ],
        ['todolistId2']: [
            {id: v1(), title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Middle},
            {id: v1(), title: "Carrot", status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi},
        ]
    },
    app: {
        error: null,
        status: 'idle'
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}> {story()} </Provider>
}