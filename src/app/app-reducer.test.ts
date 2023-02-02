import {appReducer, InitialStateType, setErrorAC, setStatusErrorAC} from "./app-reducer";

let startState: InitialStateType ;

beforeEach(() => {
    startState = {
       error: null,
        status: 'idle'
    };
});

test('correct error should be set', () => {

    const endState = appReducer(startState, setErrorAC('some error'))
    expect(endState.error).toBe('some error');
});
test('correct status error should be set', () => {

    const endState = appReducer(startState, setStatusErrorAC('loading'))
    expect(endState.status).toBe('loading');
});
