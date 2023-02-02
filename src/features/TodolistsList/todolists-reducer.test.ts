import todolistsReducer, {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC, changeTodolistTitleAC,
    FilterValuesType, removeTodolistAC, setTodolistsAC,
    TodolistDomainType,
} from './todolists-reducer'
import {v1} from "uuid";
import {TodolistType} from "../../API/todolists-api";
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
     startState = [
        {id: todolistId1, title: "What to learn", filter: 'all',entityStatus: "idle", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy" , filter: 'all',entityStatus: "idle", order: 0, addedDate: ''}
    ]
})

    test('correct todolist should be removed', () => {
 /*   let todolistId1 = v1()
    let todolistId2 = v1()

    let startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy" , filter: 'all', order: 0, addedDate: ''}    ]*/
  /*  const action: RemoveTodolistActionType = {
        type: 'REMOVE-TODOLIST',
        id: todolistId1,
    }*/
/*
    const action = {
        type: 'REMOVE-TODOLIST' as const,
        id: todolistId,
    }
*/

    // const endState = todolistsReducer(startState, action) ||
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // let newTodolistTitle = 'New Todolist'
    let todolist: TodolistType = {
        id: 'dsca',
        title: 'New Todolist',
        addedDate: '',
        order: 0,
    }


    const endState = todolistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title )
    expect(endState[0].filter).toBe('all')
})

test('correct todolist change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

 /*   const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy" , filter: 'all', order: 0, addedDate: ''}    ]*/
  /*  const action: ChangeTodolistTitleActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }*/
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be  changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = "completed"

    // const startState: Array<TodolistDomainType> = [
      /*  {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy" , filter: 'all', order: 0, addedDate: ''}    ]*/
  /*  const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }*/
    const action = changeTodolistFilterAC(todolistId2, newFilter)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should set to the state', () => {
/*
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy" , filter: 'all', order: 0, addedDate: ''}    ]
*/
    /*  const action: ChangeTodolistFilterActionType = {
          type: 'CHANGE-TODOLIST-FILTER',
          id: todolistId2,
          filter: newFilter
      }*/
    const action = setTodolistsAC(startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})
test('correct entity status  of todolist should be  changed', () => {

    let newStatus: RequestStatusType = "loading"

    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe("idle")
    expect(endState[1].entityStatus).toBe(newStatus)
})
