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
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    //class component & functional component
    //BiznesLogick BLL: data+functional logick
/*
    const todoListTitle_1: string = 'What to learn today'
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS&TS', isDone: true}, //=>{...task, isDone: false}
        {id: v1(), title: 'React', isDone: false},
    ])
*/
    const [filter, setFilter] = useState<FilterValuesType>('All');

    //id в отдельн переменн
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    //[]todolists
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        // {id: v1(), title: 'What to learn today', filter: 'All'},
        {id: todoListId_1, title: 'What to learn today', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'},
    ])
    //стейт для тасок
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS&TS', isDone: true}, //=>{...task, isDone: false}
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'BEER', isDone: true},
            {id: v1(), title: 'Meats', isDone: true}, //=>{...task, isDone: false}
            {id: v1(), title: 'Fish', isDone: false},
        ]
    })


    // DELETE
    const removeTask = (taskId: string, todoListId: string) => {
        // setTasks(tasks.filter(t => t.id !== taskId));старый код

        //[] тасок для конкретного tdl. Нашли массив
        const todoListsTasks = tasks[todoListId]
        //удалили из него таску
        const updatedTasks = todoListsTasks.filter(t => t.id !== taskId)
        //сделали копию объекта
        const copyTask = {...tasks}
        //в копию, по нужному адрессу положили массив с удаленной таской
        copyTask[todoListId] = updatedTasks
        //сетаем  в стейт
        setTasks(copyTask)

       //   ||
       /* setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})*/
    }

    // ADD
    const addTask = (title: string) => {
        const newTask: TaskType = {
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
