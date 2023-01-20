import axios from "axios";


export  type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType< D = {}> = {//D=data, D = {} po umolchaniju
    resultCode: number
    messages: Array<string>
    data: D
}
export type TaskEntityType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponseType = {
    messages: Array<string>
    resultCode: number
    data: {
        item: TaskEntityType
    }
}
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
export type UpdateTaskModelType = {
    description: string
    title: string
    // completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}


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
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks/`)
    },
    deleteTasks(todolistId: string, taskId: string) {
        return   instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return   instance.post<ResponseType<TaskEntityType>>(`todo-lists/${todolistId}/tasks/`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return   instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
};