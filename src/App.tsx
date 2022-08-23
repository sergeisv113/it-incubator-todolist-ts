import React, {useState} from 'react';
import './App.css';
import {ButtonType, TaskType, TodoList} from "./TodoList";
//CLI
//GUI => CRUD

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    //class component & functional component
    //BiznesLogick BLL:
    const todoListTitle_1: string = 'What to learn today'
    const todoListTitle_2: string = 'What to learn week'
    /*    let tasks: Array<TaskType> = [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS&TS', isDone: true},
            {id: 3, title: 'React', isDone: false},
            {id: 3, title: 'React', isDone: false},
            {id: 3, title: 'React', isDone: false},
            {id: 3, title: 'React', isDone: false},
        ]*/

    // const tasks_2: Array<TaskType> = [
    //     {id: 4, title: 'SaSS', isDone: true},
    //     {id: 5, title: 'MobX', isDone: true},
    //     {id: 6, title: 'Angular.js', isDone: false},
    // ]

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS&TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All');

const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
}

    const getTasksForTodoList = () => {
        /*    switch (filter) {
                case "Active":
                    return tasks.filter(t => !t.isDone)
                case "Completed":
                    return tasks.filter(t => t.isDone)
                default:
                    return tasks
            }*/
//   ||

        let tasksForTodolist = tasks;
        if (filter === 'Active') {
            tasksForTodolist = tasks.filter(t => t.isDone === false)
        }
        if (filter === 'Completed') {
            tasksForTodolist = tasks.filter(t => t.isDone === true)
        }
        return tasksForTodolist

    }

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID));
        console.log(tasks)//async
    }
    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle_1}
                // tasks={tasks}
                      tasks={getTasksForTodoList()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />


            {/*<TodoList title={todoListTitle_2} tasks={tasks_2}/>*/}
        </div>
    );
}

export default App;
