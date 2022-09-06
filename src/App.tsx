import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

//CLI
//GUI => CRUD
//C+func
//R+++++...func
//U++func
//D+func

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    //class component & functional component
    //BiznesLogick BLL: data+functional logick

    const todoListTitle_1: string = 'What to learn today'

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS&TS', isDone: true}, //=>{...task, isDone: false}
        {id: v1(), title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All');

    // DELETE
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID));
    }

    // ADD
    const addTask = (title: string) => {
        const  newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

//UI:
    const getTasksForTodoList = () => {
        /*    let tasksForTodolist = tasks;
            if (filter === 'Active') {
                tasksForTodolist = tasks.filter(t => !t.isDone)
            }
            if (filter === 'Completed') {
                tasksForTodolist = tasks.filter(t => t.isDone)
            }
            return tasksForTodolist
        }*/
        switch (filter) {
            case "Completed":
                return tasks.filter(task => task.isDone)
            case "Active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    }

    //update
    const changeStatus = (taskID: string, isDone: boolean) => {
        //если наша id не = taskID, то в массив кладем task без изменения, если task.id === taskID, меняем её isDone.
        //создаем новый object => вкладываем task, isDone измен.
        setTasks(tasks.map(task => task.id !== taskID ? task : {...task, isDone: isDone}))
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle_1}
                      tasks={getTasksForTodoList()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}
export default App;
