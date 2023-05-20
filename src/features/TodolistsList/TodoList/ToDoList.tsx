import React, {memo, useCallback, useEffect} from "react"
import style from './ToDoList.module.css';
import {Tasks} from "./Tasks/Tasks";
import {NewTitle} from "../../../common/components/NewTitle/NewTitle";
import {TaskTitle} from "../../../common/components/TaskTitle/TaskTitle";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton/IconButton";
import Container from "@mui/material/Container/Container";
import Button from "@mui/material/Button";
import {FilterType, TodoListDomainType} from "../todoList-reducer";
import {TASK_STATUS} from "../../../api/api";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {useActions} from '../../../common/hooks/useActions';
import {tasksActions} from './Tasks';
import {todoListsActions} from '../index';
import {deleteTodoListTC, updateTodoListTC} from "../todoLists-actions";

type TodoListType = {
    todoList: TodoListDomainType
}

export const TodoList = memo((props: TodoListType) => {

    const {id, title, filter, entityStatus} = props.todoList

    let tasks = useAppSelector(state => state.tasks[id])

    const {getTasksTC, createTaskTC} = useActions(tasksActions)
    const {updateTodoListTC, deleteTodoListTC, changesFilter} = useActions(todoListsActions)

    const filterHandler = (filterItem: FilterType) => {
        if (filterItem === filter) return
        else changesFilter({todoListID: id, filterItem})
    }

    const newTitleHandler = useCallback(async (newTitle: string) => {
        createTaskTC({todolistId: id, title: newTitle})
    }, [])

    const deleteTodoListHandler = () => deleteTodoListTC({todolistId: id})

    const todoListNewTitleHandler = (newTitle: string) => updateTodoListTC({todolistId: id, title: newTitle})

    if (filter === 'active') tasks = tasks.filter(el => el.status === TASK_STATUS.New)
    if (filter === 'completed') tasks = tasks.filter(el => el.status === TASK_STATUS.Completed)

    useEffect(() => {
        getTasksTC(id)
    }, [])

    const renderFilterButton = (onclick: () => void, buttonFilter: FilterType, text: string) => {
        return <Button
            variant={filter === buttonFilter ? 'outlined' : 'contained'}
            onClick={onclick}
            size={"small"}
        >
            {text}
        </Button>
    }

    return <div className={style.item}>
        <h3>
            <TaskTitle title={title} titleValueCallBack={todoListNewTitleHandler}/>
            <IconButton aria-label="delete" disabled={entityStatus === "loading"}>
                <Delete onClick={deleteTodoListHandler}/>
            </IconButton>
        </h3>
        <div className={style.newTitle}>
            <NewTitle
                newTitleCallBack={newTitleHandler}
                classNameButton={style.button}
                valueLabel={'New task'}
                disabled={entityStatus === "loading"}
            />
        </div>
        {tasks.length > 0 ?
            tasks.map(task => {
                return <Tasks
                    key={task.id}
                    tasks={task}
                    todoListID={id}
                />
            })
            :
            <h3>Your tasks list is empty</h3>
        }

        <Container fixed>
            {renderFilterButton(() => filterHandler('all'), 'all', 'All')}
            {renderFilterButton(() => filterHandler('active'), 'active', 'Active')}
            {renderFilterButton(() => filterHandler('completed'), 'completed', 'Completed')}
        </Container>
    </div>
})