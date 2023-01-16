import { TaskStateType} from "../App";
import tasksReducer, {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";


test('correct task should be deleted from correct array', () => {

    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Carrot", isDone: false},
        ]
    }
    const action = RemoveTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
  // ||
    //  expect(endState['todolistId2'][0].id).toBe(1)
  //  expect(endState['todolistId2'][1].id).toBe(3)
})

test('correct task should be add from correct array', () => {

    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Carrot", isDone: false},
        ]
    }
    const action = AddTaskAC('Juice', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('Juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Carrot", isDone: false},
        ]
    }
    const action = ChangeTaskStatusAC('2', false,'todolistId2' )
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBeFalsy()
    expect(endState['todolistId1'][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {

    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Carrot", isDone: false},
        ]
    }
    const action = ChangeTaskTitleAC('2', 'MilkyWay', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe("MilkyWay")
    expect(endState['todolistId1'][1].title).toBe("JS")
})

test('new property with new array should added when new todolist is added', () => {//todolist
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Carrot", isDone: false},
        ]
    }
    const action = AddTodolistAC('title no meter')//+AddTodolistActionType
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw new Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Carrot", isDone: false},
        ]
    }
    const action = RemoveTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()

})