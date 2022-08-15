import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


function App() {
    //BiznesLogick BLL:
    const todoListTitle_1: string = 'What to learn today'
    const todoListTitle_2: string = 'What to learn week'
    const tasks_1: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS&TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]
    const tasks_2: Array<TaskType> = [
        {id: 4, title: 'SaSS', isDone: true},
        {id: 5, title: 'MobX', isDone: true},
        {id: 6, title: 'Angular.js', isDone: false},
    ]


    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
