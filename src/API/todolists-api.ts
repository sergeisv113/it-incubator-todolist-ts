import axios from "axios";


export const settings = {
    withCredentials: true,//cuckies loginization || api key
    headers: {
        'API-KEY': '6b81f6a1-5ebf-4798-9547-d8f4d6c51bfc'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   /* withCredentials: true,//cuckies loginization || api key
    headers: {
        'API-KEY': '6b81f6a1-5ebf-4798-9547-d8f4d6c51bfc'
    }*/
    //  ||
    ...settings
})

// api

export const todolistsApi = {
    getTodolists() {
        // const promise =  axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        //return promise
        return   instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolists(title: string) {
        // const promise =  axios.post<ResponseType<{}><{ item: TodolistType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists',{title: title}, settings)//preload = {}
        return   instance.post<ResponseType<{ item: TodolistType }>>('todo-lists',{title: title})//preload = {}
    },
    deleteTodolists(id: string) {
        return  instance.delete<ResponseType>(`todo-lists/${id}`)// + id
    },
    updateTodolists(id: string, title: string) {
        return   instance.put<ResponseType>(`todo-lists/${id}`,{title: title})
    },

    getTasks: function (todolistId: string) {
        return  instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks/`)
    },
    deleteTasks(todolistId: string, taskId: string) {
        return   instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return   instance.post<ResponseType<{item: TaskType }>>(`todo-lists/${todolistId}/tasks/`, {title: taskTitle})
        // return   instance.post<ResponseType< TaskType >>(`todo-lists/${todolistId}/tasks/`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return   instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
};

export  type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const loginAPI = {
    login(data: LoginParamsType) {
        const promice  = instance.post<ResponseType<{userId?: number}>>('auth/login', data)
        return promice
    },
    logout() {
        const promice  = instance.delete<ResponseType<{userId?: number}>>('auth/login')
        return promice
    },
    me() {
        const promice  = instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')//id: number, email: string, login: string = iz backend
        return promice
    }
}


    //types
    export  type TodolistType = {
        id: string
        title: string
        addedDate: string
        order: number

    }

export  type ResponseType< D = {}> = {//D=data, D = {} po umolchaniju
        resultCode: number
        messages: Array<string>
            data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    priority: TaskPriorities
}
type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}

