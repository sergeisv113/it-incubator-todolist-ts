import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type ButtonType = 'All' | 'Active' | 'Completed'

type TodoListPropsTitle = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsTitle) => {

  /*  const tasksItems = props.tasks.map(oneTask => {
        return (
            <li key={oneTask.id}><input type="checkbox" checked={oneTask.isDone}/> <span>{oneTask.title}</span></li>
        )*/
    // })


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>

                    {props.tasks.map(oneTask =>
                        <li key={oneTask.id}><input type="checkbox" checked={oneTask.isDone}/> <span>{oneTask.title}</span>
                            <button onClick={() => props.removeTask(oneTask.id)}>DELETE</button>
                        </li>)
                        }

                    {/*{tasksItems}*/}
         {/*           <li key={props.tasks[0].id}><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                    <li key={props.tasks[1].id}><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                    <li key={props.tasks[2].id}><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}

                </ul>
                <div>
{/*                    <button >All</button>
                    <button >Active</button>
                    <button >Completed</button>*/}

                    <button onClick={() => {props.changeFilter('All')}}>All</button>
                    <button onClick={() => {props.changeFilter('Active')}}>Active</button>
                    <button onClick={() => {props.changeFilter('Completed')}}>Completed</button>
                </div>
            </div>
        </div>
    );
};

// export default TodoList;