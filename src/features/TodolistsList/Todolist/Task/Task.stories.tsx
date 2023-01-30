import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses, } from "../../../../API/todolists-api";


export default {
    title: 'Task Component',
    component: Task
}

 //const callback = action(`Button 'add' was pressed inside the form`)
 const changeTaskStatusCallback = action(`Status changed`)
 const changeTaskTitleCallback = action(`Title changed`)
 const removeTaskCallback = action(`Removed task changed`)

export const TaskBaseExample = () => {
    return (
        <>
            <Task
                task={ {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi}
                }
                changeTaskTitle={changeTaskTitleCallback}
                changeTaskStatus={changeTaskStatusCallback}
                removeTask={removeTaskCallback}
                todolistId={'todolistId1'}
            />
            <Task
                task={ {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId', startDate: '', description: '', deadline: '', addedDate: '' , order: 0, priority: TaskPriorities.Hi} }
                changeTaskTitle={changeTaskTitleCallback}
                changeTaskStatus={changeTaskStatusCallback}
                removeTask={removeTaskCallback}
                todolistId={'todolistId2'}
            />
        </>
    )
}
