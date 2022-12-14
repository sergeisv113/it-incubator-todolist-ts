import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    // id: number
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsTitle = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    // removeTask: (taskID: number) => void
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void //setNewTaskTitle
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListId: string) => void
}

export const TodoList: FC<TodoListPropsTitle> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    let taskItems: any = <span>Tasks list is empty</span>
    if (props.tasks.length) {
        taskItems = props.tasks.map(task => {
            return (
                <li key={task.id}
                    className={task.isDone ? 'isDone' : ''}
                >
                    <input
                        /*onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked)}*/
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <span>{task.title}</span>
                   {/* <button onClick={() => props.removeTask(task.id)}>X</button>*/}
                    <button onClick={() => props.removeTask(task.id, props.todoListId)}>X</button>
                </li>
            )
        })
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            // props.addTask(trimmedTitle)
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const handlerCreator = (filter: FilterValuesType, todoListId: string) => () => props.changeFilter(filter, todoListId)
   /* const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)*/
    const userMessage = error
        ? <div style={{color: 'red'}}>Tasks list is empty</div>
        : <div>Please, create list item</div>

    /*const onAllClickHandler = () => props.changeFilter('All')
    const onActiveClickHandler = () => props.changeFilter('Active')
    const onCompletedClickHandler = () => props.changeFilter('Completed')*/


    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={() => props.removeTodolist(props.todoListId)}>x</button>
                </h3>

                <div>
                    <input
                        value={title}
                        onChange={changeTitle}
                        className={error ? 'error' : ''}
                        onKeyDown={onKeyDownAddTask}/>
                    <button onClick={addTask}>+</button>

                    {error && userMessage}
                </div>

                <ul>
                    {taskItems}
                </ul>

                <div>
                    <button className={props.filter === 'All' ? 'btn-active btn' : 'btn'}
                            onClick={handlerCreator('All', props.todoListId)}>All
                    </button>
                    <button className={props.filter === 'Active' ? 'btn-active btn' : 'btn'}
                            onClick={handlerCreator('Active', props.todoListId)}>Active
                    </button>
                    <button
                        className={props.filter === 'Completed' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator('Completed', props.todoListId)}>Completed
                    </button>
                </div>

            </div>
        </div>
    );
}
