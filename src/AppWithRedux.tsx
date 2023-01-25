import React, {useCallback, useEffect} from 'react';
import './App.css';
import { Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTaskAC,
    AddTaskTC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    deleteTaskTC,
    RemoveTaskAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, fetchTodolistsTC, FilterValuesType,
    RemoveTodolistAC, TodolistDomainType
} from "./state/todolists-reducer";
import {TaskStatuses, TaskType, todolistsApi} from "./API/todolists-api";

/*export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}*/
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('App is called')
/*CLI
GUI => CRUD
C+func
R+++++...func
U++func
D+func
class component & functional component
    BiznesLogick BLL: data+functional logick*/

    //id в отдельн переменн
const dispatch = useDispatch()//dispatchTasksReducier + dispatchTodolistsReducier
const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state =>  state.todolists)
const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

/*let todolistId1 = v1()
let todolistId2 = v1()*/
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])



/*    let [todolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to buy", filter: 'all'},
        {id: todolistId2, title: "What to learn" , filter: 'all'}
    ]);

    let [tasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Carrot", isDone: false},
        ]
    });*/


    // DELETE
    //func for task
    //useCallback оборач, т.к => return object, а {} === {} = false all function
    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = deleteTaskTC(id, todolistId)
        dispatch(thunk)
        //||
        //const action = deleteTaskTC(id, todolistId)
        //         dispatch(action)

        //[] тасок для конкретного tdl. Нашли массив
     //   let todolistTasks = tasks[todolistId]// достаем нужный массив по ид
      //  tasks[todolistId] = todolistTasks.filter(t => t.id !== id)//перезапис в этот объкт массив для нужного тдл отфильтрованным массивом
        // setTasks({...tasks})
    }, []);

    const addTask = useCallback( (title: string, todolistId: string) => {
        // const action = AddTaskAC(title, todolistId)
        const thunk = AddTaskTC(title, todolistId)
        dispatch(thunk)
        /*const newTask: TaskType = {
          id: v1(), title: title, isDone: false
      }
      setTasks([newTask, ...tasks]) старый код*/
        //создаем новый обект
        // let task = {id: v1(), title: title, isDone: false};
        //находим массив в кот добавить
        // let todolistTasks = tasks[todolistId];
        //  создаем новый массив
        // tasks[todolistId] = [task, ...todolistTasks]
        // setTasks({...tasks});
        //в копию, по нужному адрессу положили обновленный массив
    }, [])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string)  => {
        const action = ChangeTaskStatusAC(id, status, todolistId)
        dispatch(action)
/*
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(tl => tl.id === id);
        if (task) {
            task.isDone = isDone;
           // setTasks({...tasks})
        }
*/
    }, [dispatch] )

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = ChangeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
        /*let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(tl => tl.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }*/
    }, [dispatch])

    //func for todolist
    const changeFilter = useCallback((todolistId: string, value: FilterValuesType ) => {
        const action = ChangeTodolistFilterAC(todolistId, value )
        dispatch(action)

        /*let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todolists])
        }*/
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatch(action)


       /* let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodoList(filteredTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})*/
    }, [dispatch])

    const addTodolist = useCallback((title:string) => {
        const action = AddTodolistAC(title)
        dispatch(action)

      /*  let todolist: TodoListType = {
            id: v1(),
            title: title,
            filter: "all",
        }
        setTodoList([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: [],
        })*/
    }, [dispatch]);//useCallback оборач, т.к => return object, а {} === {} = false

    const changeTodolistTitle = useCallback(function (todolistId: string, newTitle: string) {
        const action = ChangeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)

       /* const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoList([...todolists])
        }*/
    }, [dispatch])

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
                       let allTodolistTasks = tasks[tl.id]
                       let tasksForTodolist = allTodolistTasks

                 /*      if (tl.filter === "active") {
                           tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone);
                       }
                       if (tl.filter === "completed") {
                           tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone === true);
                       }*/// in todolist, что бы при фильтрации не перерисов каждый раз all Todolist
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

export default AppWithRedux;
// all callback оборач в useCallback если он передается в component, но если передается в елемент(button onClick) , то нет!!, a all component оборач в React.memo