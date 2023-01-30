import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../API/store";
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistsTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses, TaskType} from "../../API/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

type TodolistsListPropsType = {
    // todolist: Array<TodolistDomainType>
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {
    const dispatch = useDispatch()//dispatchTasksReducier + dispatchTodolistsReducier
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


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

    const addTask = useCallback((title: string, todolistId: string) => {
        // const action = AddTaskAC(title, todolistId)
        const thunk = addTaskTC(title, todolistId)
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

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        // const action = ChangeTaskStatusAC(id, status, todolistId)
        // dispatch(action)
        const thunk = updateTaskTC(id, {status: status}, todolistId)
        dispatch(thunk)
        /*
                let todolistTasks = tasks[todolistId]
                let task = todolistTasks.find(tl => tl.id === id);
                if (task) {
                    task.isDone = isDone;
                   // setTasks({...tasks})
                }
        */
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        // const action = ChangeTaskTitleAC(id, newTitle, todolistId)
        // dispatch(action)
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
        /*let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(tl => tl.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }*/
    }, [])

    //func for todolist
    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType,) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)

        /*let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todolists])
        }*/
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        // const action = RemoveTodolistAC(todolistId)
        const thunk = removeTodolistsTC(todolistId)
        dispatch(thunk)


        /* let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
         setTodoList(filteredTodolist)
         delete tasks[todolistId]
         setTasks({...tasks})*/
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistsTC(title)
        dispatch(thunk)

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
    }, []);//useCallback оборач, т.к => return object, а {} === {} = false

    const changeTodolistTitle = useCallback(function (todolistId: string, newTitle: string) {
        // const action = ChangeTodolistTitleAC(todolistId, newTitle)
        // dispatch(action)
        const thunk = changeTodolistsTitleTC(todolistId, newTitle)
        dispatch(thunk)

        /* const todolist = todolists.find(tl => tl.id === id)
         if (todolist) {
             todolist.title = newTitle
             setTodoList([...todolists])
         }*/
    }, [])


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}