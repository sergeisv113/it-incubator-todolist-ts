import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./API/todolists-api";
import { FilterValuesType} from "./state/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/tasks-reducer";

/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilterValuesType, ) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo(function(props: PropsType)  {
    console.log('Todolist is called')
//zapros tasks from DB
   const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))//kinkretnij todolist
    }, [])

    const addTask = useCallback((title: string) => {// f wrapper= props - id
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    //useCallback оборач, т.к => return object, а {} === {} = false

    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(props.id, title), [props.changeTodolistTitle, props.id])

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = useCallback(() => props.changeFilter( props.id,"all"), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id,"active"), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id,"completed"), [props.changeFilter, props.id]);



    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            {/*{props.title} */}
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
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
                          todolistId={props.id}
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
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
})

