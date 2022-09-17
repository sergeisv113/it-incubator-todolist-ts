import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    // id: number
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsTitle = {
    title: string
    tasks: Array<TaskType>
    // removeTask: (taskID: number) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void //setNewTaskTitle
    changeStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValuesType
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
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked)}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>X</button>
                </li>
            )
        })
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
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

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const userMessage = error
        ? <div style={{color: 'red'}}>Tasks list is empty</div>
        : <div>Please, create list item</div>

    /*const onAllClickHandler = () => props.changeFilter('All')
    const onActiveClickHandler = () => props.changeFilter('Active')
    const onCompletedClickHandler = () => props.changeFilter('Completed')*/


    return (
        <div>
            <div>
                <h3>{props.title}</h3>

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
                            onClick={handlerCreator('All')}>All
                    </button>
                    <button className={props.filter === 'Active' ? 'btn-active btn' : 'btn'}
                            onClick={handlerCreator('Active')}>Active
                    </button>
                    <button
                        className={props.filter === 'Completed' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator('Completed')}>Completed
                    </button>
                </div>

            </div>
        </div>
    );
}
