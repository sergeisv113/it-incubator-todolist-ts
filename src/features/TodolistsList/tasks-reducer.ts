
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../../API/todolists-api";
import {Dispatch} from "redux";
import {TaskStateType} from "../../trash/AppWithReducer";
import { AppRootState, AppThunkType} from "../../API/store";
import {setErrorAC, setStatusErrorAC} from "../../app/app-reducer";

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
*/
/*export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    taskId: string
    todolistId: string
    model: UpdateDomainTaskModelType
}
export type SetTasksActionType = {
    type: 'SET-TASK',
    tasks: Array<TaskType>,
    todolistId: string
}*/


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

export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionType): TaskStateType => {
    switch (action.type) {

        case "REMOVE-TASK": {
            /*const stateCopy = {...state}//all
            let tasks = state[action.todolistId]
             const newFilteredTasks = tasks.filter(t => t.id != action.taskId)
            stateCopy[action.todolistId] = newFilteredTasks
            return stateCopy*/
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        }
        case "ADD-TASK": {
           /* const stateCopy = {...state}//all
            let newTask = action.task
            let tasks = stateCopy[newTask.todoListId]
                // let newTask: TaskType= {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi};
            let newTasks =  [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy*/
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }

        case "UPDATE-TASK": {
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

           /* let todolistTasks = state[action.todolistId]
            let newTaskArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t)

            state[action.todolistId] = newTaskArray
            return ({...state})*/
        return {...state, [action.todolistId]: state[action.todolistId]
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        }

/*        case "CHANGE-TASK-TITLE": {
         /!*   const stateCopy = {...state}//all

            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(tl => tl.id === action.taskId);
            if (task) {
                task.title = action.newTitle;
        }
            return stateCopy*!/

            let todolistTasks = state[action.todolistId]
            // найдём нужную таску:
            let newTaskArray = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, newTitle: action.newTitle}
                    : t);
            state[action.todolistId] = newTaskArray
            return ({...state})
        }*/
        case 'SET-TASKS': {
            /*let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy*/
            return {...state, [action.todolistId]: action.tasks}
        }


        case 'ADD-TODOLIST': {//+
            /*const stateCopy = {...state}//all

                stateCopy[action.todolist.id] = []
            return stateCopy*/
            return {...state, [action.todolist.id]: []}
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
        case "SET-TASKS": {
           /* const stateCopy = {...state}//all
            stateCopy[action.todolistId] = action.tasks
            return stateCopy*/
            return {...state, [action.todolistId]: action.tasks}
        }

        default:
            // throw new Error('Error')
            return state
    }
}

// func action creator


export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: "REMOVE-TASK", taskId: taskId, todolistId:  todolistId}) as const

// export const AddTaskAC = (newTodolistTitle: string,  todolistId: string) => ({type: "ADD-TASK", title: newTodolistTitle, todolistId: todolistId}) as const
export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task}) as const

// export const ChangeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({type: "CHANGE-TASK-STATUS", taskId, status, todolistId}) as const
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: "UPDATE-TASK", taskId, model, todolistId}) as const

// export const  changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId }) as const

 export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
     ({type: "SET-TASKS", tasks, todolistId}) as const

//thunk creator

export const fetchTasksTC = (todolistId: string): AppThunkType => dispatch => {
    dispatch(setStatusErrorAC('loading'))// pokaz progress zagruzki

        todolistsApi.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))//sozdal tasku
                dispatch(setStatusErrorAC('succeeded'))// ne pokaz progress zagruzki
            })
}

export const deleteTaskTC = (  taskId: string, todolistId: string): AppThunkType => dispatch => {
        todolistsApi.deleteTasks(todolistId, taskId)
            .then(res => {
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
}

export const addTaskTC = (title: string, todolistId: string): AppThunkType => dispatch => {
    dispatch(setStatusErrorAC('loading'))// pokaz progress zagruzki

        todolistsApi.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) { //otvet servera
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                    dispatch(setStatusErrorAC('succeeded'))// ne pokaz progress zagruzki
                } else {
                    if (res.data.messages.length) {
                        dispatch(setErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setErrorAC('Some error occurred'))
                    }
                    dispatch(setStatusErrorAC('failed'))//
                }
            })
      }

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunkType => (dispatch, getState: () => AppRootState) => {//return all state

        const  state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
            if (!task) {
              //  throw  new Error('task not found in the state')
                console.warn('task not found in the state')
                return;
            }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            status: task.status,
            ...domainModel
        }
        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
}

// types
//changeTaskStatus+changeTaskTitle
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksActionType =
/* | RemoveTaskActionType
 | AddTaskActionType
 | ChangeTaskTitleActionType
 | ChangeTaskStatusActionType
 | AddTodolistActionType
  | RemoveTodolistActionType*/

    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    // | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>



export default tasksReducer