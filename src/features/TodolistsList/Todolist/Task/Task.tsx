import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../API/todolists-api";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId);

    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        {/*  <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>*/}
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.status === TaskStatuses.Completed}/>
        {/*<span>{t.title}---</span>*/}
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        {/*<button onClick={onClickHandler}>x</button>*/}
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})