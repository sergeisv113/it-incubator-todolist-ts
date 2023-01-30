import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "../API/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../features/TodolistsList/todolists-reducer";
import {TaskStateType} from "./AppWithReducer";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";

/*export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}*/
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
/*CLI
GUI => CRUD
C+func
R+++++...func
U++func
D+func
class component & functional component
    BiznesLogick BLL: data+functional logick*/

    //id в отдельн переменн
let todolistId1 = v1()
let todolistId2 = v1()

    let [todolists, setTodoList] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "What to buy", filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: "What to learn" , filter: 'all', order: 0, addedDate: ''}
    ]);

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            // {id: v1(), title: "HTML&CSS",status: 2 = isDone: true},

            {id: v1(), title: "HTML&CSS",status: TaskStatuses.Completed, todoListId: todolistId1, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Low},
           {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId: todolistId1, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId: todolistId1, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi},
            {id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId: todolistId1, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Middle},
        ],
        [todolistId2]: [
          {id: v1(), title: "Book", status: TaskStatuses.New, todoListId: todolistId2, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Middle},
            {id: v1(), title: "Carrot", status: TaskStatuses.New, todoListId: todolistId2, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi},
        ]
    });

    // DELETE
    //func for task
    function removeTask(id: string, todolistId: string) {
        //[] тасок для конкретного tdl. Нашли массив
        let todolistTasks = tasks[todolistId]// достаем нужный массив по ид
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)//перезапис в этот объкт массив для нужного тдл отфильтрованным массивом
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        /*const newTask: TaskType = {
          id: v1(), title: title, isDone: false
      }
      setTasks([newTask, ...tasks]) старый код*/
        //создаем новый обект
        // let task = {id: v1(), title: title, isDone: false};

        let task = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId, startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi};
        //находим массив в кот добавить
        let todolistTasks = tasks[todolistId];
        //  создаем новый массив
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
        //в копию, по нужному адрессу положили обновленный массив
    }

    function changeTaskStatus(id: string, status: TaskStatuses, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(tl => tl.id === id);
        if (task) {
            task.status = status;
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(tl => tl.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    //func for todolist
    function changeFilter(todolistId: string, value: FilterValuesType, ) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todolists])
        }
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodoList(filteredTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function addTodolist(title:string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            title: title,
            filter: "all",
            addedDate: '',
            order: 0
        }
        setTodoList([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: [],
        })
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoList([...todolists])
        }
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={"inherit"} aria-label={'menu'}>
                        <Menu />
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>

           <Container>

               <Grid container style={{padding: '20px'}}>
                   <AddItemForm addItem={addTodolist} />
               </Grid>

               <Grid container spacing={5}>
               {
                   todolists.map((tl) => {
                       let tasksForTodolist = tasks[tl.id]

                       if (tl.filter === "active") {
                           tasksForTodolist = tasksForTodolist.filter(tl => tl.status === TaskStatuses.New);
                       }
                       if (tl.filter === "completed") {
                           tasksForTodolist = tasksForTodolist.filter(tl => tl.status === TaskStatuses.Completed);
                       }
                       return   <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist id={tl.id}
                                              key={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              removeTodolist={removeTodolist}
                                              filter={tl.filter}
                                              changeTodolistTitle={changeTodolistTitle}

                                    />
                                </Paper>
                       </Grid>
                   })
               }
               </Grid>

           </Container>
        </div>
    );
}

export default App;
