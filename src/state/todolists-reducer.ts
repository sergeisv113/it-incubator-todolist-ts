import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

/*let todolistId1 = v1()
let todolistId2 = v1()*/

/*const initialState: Array<TodoListType> = [
    {id: todolistId1, title: "What to buy", filter: 'all'},
    {id: todolistId2, title: "What to learn" , filter: 'all'}
]*/
const initialState: Array<TodoListType> = []

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [ {
                id: action.todolistId,// общий id для task & todolist
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            // throw new Error('Error')
            return state
    }
}
// func action creator
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTodolistTitle}
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType, ): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER",id: todolistId, filter: newFilter, }
}
/*export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}*/

export default todolistsReducer