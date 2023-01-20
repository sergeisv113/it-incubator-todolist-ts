import React, {useEffect, useState} from "react";
import axios from "axios";
import {todolistsApi, UpdateTaskModelType} from "../API/todolists-api";
import {settings} from "../API/todolists-api";

export default {
    title: 'API Component'
}

/*export const settings = {
    withCredentials: true,//cuckies loginization || api key
    headers: {
        'API-KEY': '6b81f6a1-5ebf-4798-9547-d8f4d6c51bfc'
    }
}*/
//useEffect  zagruzhaetsja srazu
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
        //здесь мы будем делать запрос и ответ закидывать в стейт
        //который в виде строки будет отображать в div
       // let promise =  axios.get('https://....')
       //  promise.then((res) => {
        // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
            debugger
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistsApi.createTodolists(title)
            .then((res) => {
                setState(res.data)
            })
       }
    return <div>{JSON.stringify(state)}
        <input placeholder={'title'} value={title}
                onChange={(e) => {setTitle(e.currentTarget.value) }}/>
        <button onClick={createTodolist}>create todolist</button>
    </div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistsApi.deleteTodolists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={todolistId} value={todolistId}
               onChange={(e) => {setTodolistId(e.currentTarget.value)}}
        />
        <button onClick={deleteTodolist}>delete todolist</button>
    </div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTodolist = () => {
        let todolistId = ''
        todolistsApi.updateTodolists(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={e => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'title'} value={title} onChange={e => {setTitle(e.currentTarget.value)}}/>
        <button onClick={updateTodolist}>update todolist</button>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTask = () => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'get task'} value={todolistId}
               onChange={(e) => {setTodolistId(e.currentTarget.value)}}
        />
        <button onClick={getTask}>get task</button>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        todolistsApi.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId}
               onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'task title'} value={taskTitle}
               onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
        <button onClick={createTask}>create task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId,/**/ setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        const todolistId = ''
        const taskId = ''
        todolistsApi.deleteTasks(todolistId, taskId)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId}
               onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId}
               onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <div onClick={deleteTask}>delete task</div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [priority, setPriority] = useState<number>(0)
    const [status, setStatus] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    const createTask = () => {
        todolistsApi.updateTask(todolistId, taskId, {
            deadline: null,
            description: description,
            priority: priority,
            startDate: null,
            status: status,
            title: title
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId}
               onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId}
               onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <input placeholder={'Task title'} value={title}
               onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <input placeholder={'description'} value={description}
               onChange={(e) => {setDescription(e.currentTarget.value)}}/>
        <input placeholder={'priority'} value={priority}
               type={'number'}
               onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
        <input placeholder={'status'} value={status}
               type={'number'}
             onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
{/*        <input placeholder={'start date'} value={startDate}
               onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
        <input placeholder={'deadline'} value={deadline}
               onChange={(e) => {setDeadline(e.currentTarget.value)}}/>*/}
        <button onClick={createTask}>update task</button>
    </div>
}

//     UI   =>       BLL          =>    DAL
//   react  <=    state(redux)    <=   API.ts => DB API