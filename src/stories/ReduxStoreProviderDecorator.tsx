import React from "react";
import {Provider} from "react-redux";
import {AppRootState, store} from "../state/store";
import {combineReducers, createStore} from "redux";
import tasksReducer from "../state/tasks-reducer";
import todolistsReducer from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: "What to buy", filter: 'all', order: 0, addedDate: '',},
        {id: 'todolistId2', title: "What to learn" , filter: 'all', order: 0, addedDate: ''}
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
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}> {story()} </Provider>
}