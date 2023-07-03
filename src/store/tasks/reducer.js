import { TASK_DELETED, TASK_UPDATED } from './actionTypes'

export function taskReducer(state = [], action) {
    switch (action.type) {
        case TASK_UPDATED: {
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
        case TASK_DELETED: {
            const newArray = [...state].filter(
                element => element.id !== action.payload.id
            )
            return newArray
        }

        default:
            return state
    }
}
