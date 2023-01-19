import React from "react";
import {Provider} from "react-redux";
import {AppRootState, store} from "../state/store";
import {combineReducers, createStore} from "redux";
import tasksReducer from "../state/tasks-reducer";
import todolistsReducer from "../state/todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: "What to buy", filter: 'all'},
        {id: 'todolistId2', title: "What to learn" , filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        ['todolistId2']: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Carrot", isDone: false},
        ]
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}> {story()} </Provider>
}