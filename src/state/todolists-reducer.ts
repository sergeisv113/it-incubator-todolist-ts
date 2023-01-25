import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../API/todolists-api";
import {Dispatch} from "redux";

/* type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}*/

// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
/*export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodolistDomainType>
}*/

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof SetTodolistsAC>

type ActionType =
   /* | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType*/
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | SetTodolistsActionType

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

/*let todolistId1 = v1()
let todolistId2 = v1()*/

/*const initialState: Array<TodoListType> = [
    {id: todolistId1, title: "What to buy", filter: 'all'},
    {id: todolistId2, title: "What to learn" , filter: 'all'}
]*/
const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [ {
                id: action.todolistId,// общий id для task & todolist
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
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
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
               return {
                   ...tl,
                   filter: "all"
               }
            })
        }
        default:
            // throw new Error('Error')
            return state
    }
}
// func action creator
/* type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
} */
// type  RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
/*export const RemoveTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistId} as const
}*/
export const RemoveTodolistAC = (todolistId: string) => ({type: "REMOVE-TODOLIST", id: todolistId}) as const

export const AddTodolistAC = (newTodolistTitle: string) => ({type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1()}) as const

export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => ({type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTodolistTitle}) as const

export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType ) => ({type: "CHANGE-TODOLIST-FILTER",id: todolistId, filter: newFilter}) as const

export const SetTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists}) as const

// export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
//     return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
// }
//react => redux => api
/*export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistsApi.getTodolists()
    .then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}*/

//thunc-creator
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists()
            .then((res) => {
                dispatch(SetTodolistsAC(res.data))
            })
    }
}
export default todolistsReducer

