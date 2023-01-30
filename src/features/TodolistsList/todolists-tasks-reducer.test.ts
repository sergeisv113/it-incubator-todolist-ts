import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import tasksReducer from "./tasks-reducer";
import {TasksStateType} from "./TodolistsList";


test('ids should be equals', () => {
   const startTaskState: TasksStateType = {}
   const startTodolistsState: Array<TodolistDomainType> = []


    let todolist = {
        id: 'dsca',
        title: "new todolist",
        addedDate: '',
        order: 0,
    }

   const action = addTodolistAC(todolist)

   const endTasksState = tasksReducer(startTaskState, action)
   const endTodolistsState = todolistsReducer(startTodolistsState, action)

   const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)

})



