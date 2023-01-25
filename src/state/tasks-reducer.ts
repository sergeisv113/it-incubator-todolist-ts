
import {v1} from "uuid";
import {
    SetTodolistsActionType,
    RemoveTodolistActionType,
    AddTodolistActionType,
    SetTodolistsAC
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi} from "../API/todolists-api";
import {Dispatch} from "redux";
import {TaskStateType} from "../AppWithReducer";

/*export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    newTitle: string,
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    isDone: boolean,
    todolistId: string
}*/
export type SetTasksActionType = {
    type: 'SET-TASK',
    tasks: Array<TaskType>,
    todolistId: string
}

type ActionType =
   /* | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
     | RemoveTodolistActionType*/

    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof SetTasksAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof ChangeTaskStatusAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

/*let todolistId1 = v1()
let todolistId2 = v1()*/

/*const initialState: TaskStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "Book", isDone: false},
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Carrot", isDone: false},
    ]
}*/
const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}//all
            let tasks = state[action.todolistId]
             const newFilteredTasks = tasks.filter(t => t.id != action.taskId)
            stateCopy[action.todolistId] = newFilteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}//all

            let newTask = action.task
            let tasks = stateCopy[newTask.todoListId]
                // let newTask: TaskType= {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi};
            let newTasks =  [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }

        case "CHANGE-TASK-STATUS": {
          /*  const stateCopy = {...state}//all

            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(tl => tl.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
                /!* let todolistTasks = tasks[todolistId]
                     let task = todolistTasks.find(tl => tl.id === id);
                     if (task) {
                    }      task.isDone = isDone;*!/
            }
            return stateCopy*/
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                ? {...t, status: action.status}
                : t);
            return ({...state})
        }

        case "CHANGE-TASK-TITLE": {
         /*   const stateCopy = {...state}//all

            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(tl => tl.id === action.taskId);
            if (task) {
                task.title = action.newTitle;
        }
            return stateCopy*/

            let todolistTasks = state[action.todolistId]
            // найдём нужную таску:
            let newTaskArray = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, newTitle: action.newTitle}
                    : t);
            state[action.todolistId] = newTaskArray
            return ({...state})
        }
        case 'ADD-TODOLIST': {//+
            const stateCopy = {...state}//all

                stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'SET-TASKS': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case 'SET-TODOLISTS' : {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}//all

            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TASK": {
            const stateCopy = {...state}//all
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            // throw new Error('Error')
            return state
    }
}

// func action creator
export const RemoveTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId: taskId, todolistId:  todolistId}) as const

// export const AddTaskAC = (newTodolistTitle: string,  todolistId: string) => ({type: "ADD-TASK", title: newTodolistTitle, todolistId: todolistId}) as const
export const AddTaskAC = (task: TaskType) => ({type: "ADD-TASK", task}) as const

export const  ChangeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId }) as const

export const ChangeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({type: "CHANGE-TASK-STATUS", taskId, status, todolistId}) as const

 export const SetTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: "SET-TASKS", tasks, todolistId}) as const

//thunk creator

export const fetchTasksTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
          todolistsApi.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(SetTasksAC(tasks, todolistId))
            })
    }
}
export const deleteTaskTC = (  taskId: string, todolistId: string) => {

    return (dispatch: Dispatch) => {
        todolistsApi.deleteTasks(todolistId, taskId)
            .then(res => {
                const action = RemoveTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }
}
export const AddTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTask(todolistId, title)
            .then(res => {
                const task = res.data.data
                const action = AddTaskAC(task)
                dispatch(action)
            })
    }
}

export default tasksReducer