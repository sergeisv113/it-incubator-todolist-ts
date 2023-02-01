type InitialStateType = {
    //proischodit li seychas vzaemodejstvie s serverom
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    //esli error kakaja-to globalnaja => text error sjuda
    error: string | null
}
const initialState: InitialStateType = {
    status: 'idle',
    // error: 'Some error'
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.typa) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

type AppActionType = any