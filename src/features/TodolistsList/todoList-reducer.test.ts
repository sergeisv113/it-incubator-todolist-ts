import {v1} from "uuid";
import {
    changesFilterAC, TodoListDomainType,
    todoListReducer,
} from "./todoList-reducer";
import {TodoListType} from "../../api/api";
import {createTodoListTC, deleteTodoListTC, updateTodoListTC} from './todoLists-actions';

const todoListID_1 = v1();
const todoListID_2 = v1();
const todoListID_3 = v1();

let todoLists: TodoListDomainType[];
let newTodoList: TodoListType
beforeEach(() => {
    todoLists = [
        {
            id: todoListID_1,
            title: 'HTML/CSS',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        },
        {
            id: todoListID_2,
            title: 'JS/TS',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        },
    ]
    newTodoList = {
        id: todoListID_3,
        title: 'New TodoList',
        order: 0,
        addedDate: ''
    }
})

test('filter changes', () => {
    const todoListReducer1 = todoListReducer(todoLists, changesFilterAC({
        todoListID: todoListID_1,
        filterItem: "active"
    }))
    const todoListReducer2 = todoListReducer(todoLists, changesFilterAC({
        todoListID: todoListID_2,
        filterItem: "completed"
    }))
    expect(todoListReducer1[0].filter).toBe("active")
    expect(todoListReducer2[1].filter).toBe("completed")
})

test('add todoList', () => {
    const action = createTodoListTC.fulfilled(newTodoList, 'requestId', {titleValue: 'New TodoList'})
    const todoListReducerTest = todoListReducer(todoLists, action)
    expect(todoListReducerTest.length).toBe(3)
})

test('change todoList new title', () => {
    const action = updateTodoListTC.fulfilled({
        todolistId: todoListID_1,
        title: "New Name TodoList"
    }, 'requestId', {todolistId: todoListID_1, title: "New Name TodoList"})
    const todoListReducerTest = todoListReducer(todoLists, action)
    expect(todoListReducerTest[0].title).toBe('New Name TodoList')
})

test('delete todoList', () => {
    const action = deleteTodoListTC.fulfilled({todolistId: todoListID_1}, 'requestId', {todolistId: todoListID_1})
    const todoListReducerTest = todoListReducer(todoLists, action)
    expect(todoListReducerTest[0].id).not.toBe(todoListID_1)
    expect(todoListReducerTest.length).toBe(1)
})