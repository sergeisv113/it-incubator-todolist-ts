
const initialState: InitialStateType = {
    status: 'idle',
   // error: 'Some error'
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}
export const setErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error: error} as const)
export const setStatusErrorAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status: status} as const)

export type AppActionType = ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusErrorAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    //proischodit li seychas vzaemodejstvie s serverom
    status: 'idle' | 'loading' | 'succeeded' | 'failed',

    //esli error kakaja-to globalnaja => text error sjuda
    error: string | null
}