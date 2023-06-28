import { taskDeleted, taskUpdated } from './actionTypes'

export function taskReducer(state, action) {
    switch (action.type) {
        case taskUpdated: {
            const newArray = [...state]
            const elementIndex = newArray.findIndex(
                element => element.id === action.payload.id
            )
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload
            }
            return newArray
        }
        case taskDeleted: {
            const newArray = [...state].filter(
                element => element.id !== action.payload.id
            )
            return newArray
        }

        default:
            return state
    }
}
