import {applyMiddleware, combineReducers, createStore} from "redux";
import tasksReducer from "./tasks-reducer";
import todolistsReducer from "./todolists-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
/*type AppRootState = {
    todolists:  Array<TodoListType>
    tasks:   TaskStateType
}*/
export  type  AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// applyMiddleware(thunkMiddleware) if prichodit action, on ee propuskaet in reducer,
// a esli thunk to zapuskaet etu func.

