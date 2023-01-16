// const INCREMENT_AGE = 'INCREMENT-AGE'
// const INCREMENT_CHILDREN_COUNT = 'INCREMENT-CHILDREN-COUNT'

type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key:string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT_AGE':
            let newState = {...state}// copy
            newState.age = state.age + 1
            return newState
        case 'INCREMENT_CHILDREN_COUNT':
            return {
                ...state, // copy
                childrenCount: state.childrenCount + 1
            }//  ||
/*
            let newStateChild = {...state}
            newStateChild.childrenCount = state.childrenCount + 1
            return newStateChild
*/
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error('Error')
    }
}