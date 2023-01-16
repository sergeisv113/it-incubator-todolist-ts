import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


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
                task={ {id: '1', isDone: true, title: 'CSS'} }
                changeTaskTitle={changeTaskTitleCallback}
                changeTaskStatus={changeTaskStatusCallback}
                removeTask={removeTaskCallback}
                todolistId={'todolistId1'}
            />
            <Task
                task={ {id: '2', isDone: false, title: 'JS'} }
                changeTaskTitle={changeTaskTitleCallback}
                changeTaskStatus={changeTaskStatusCallback}
                removeTask={removeTaskCallback}
                todolistId={'todolistId2'}
            />
        </>
    )
}
