import React, {useCallback, useEffect} from 'react';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../API/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {useAppDispatch} from "../../../hooks/hooks";

/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type PropsType = {
    todolist: TodolistDomainType

    /*id: string
    title: string
    filter: FilterValuesType = {todolist}*/

    tasks: Array<TaskType>
    changeFilter: (todolistId: string, filter: FilterValuesType, ) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    demo?: boolean//demo rezhim
}

export const Todolist = React.memo(function({demo = false,...props}: PropsType)  {
    console.log('Todolist is called')
//zapros tasks from DB
  //  if (typeof props.demo === 'undefined') props.demo = false

   const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return //demo rezhim? no DB state
        } else {
            dispatch(fetchTasksTC(props.todolist.id))//kinkretnij todolist DB state
        }
    }, [])

    const addTask = useCallback((title: string) => {// f wrapper= props - id
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])
    //useCallback оборач, т.к => return object, а {} === {} = false

    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(props.todolist.id, title), [props.changeTodolistTitle, props.todolist.id])

    const removeTodolist = () => props.removeTodolist(props.todolist.id)

    const onAllClickHandler = useCallback(() => props.changeFilter( props.todolist.id,"all"), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id,"active"), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id,"completed"), [props.changeFilter, props.todolist.id]);



    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
            {/*{props.title} */}
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist}
                        disabled={props.todolist.entityStatus === 'loading'}//button disabled kogda zagruzka
            >
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm
            disabled={props.todolist.entityStatus === 'loading'}//button disabled kogda zagruzka
            addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    //create component => checkbox
                  /*  const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                         props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);

                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                      {/!*  <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>*!/}
                        <Checkbox
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>
                        {/!*<span>{t.title}---</span>*!/}
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        {/!*<button onClick={onClickHandler}>x</button>*!/}
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>*/

                return   <Task key={t.id}
                          task={t}
                          todolistId={props.todolist.id}
                          removeTask={props.removeTask}
                          changeTaskStatus={props.changeTaskStatus}
                          changeTaskTitle={props.changeTaskTitle}
                    />
                })
            }
        </div>
        <div>
            {/*<Button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</Button>*/}
            <Button variant={props.todolist.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.todolist.filter === 'active' ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.todolist.filter === 'completed' ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
})

