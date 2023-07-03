const TASK_UPDATED = 'task/updated'
const TASK_DELETED = 'task/deleted'

export function taskCompletedActionCreater(id) {
    return {
        type: TASK_UPDATED,
        payload: { id, completed: true }
    }
}

export function titleChangedActionCreater(id) {
    return {
        type: TASK_UPDATED,
        payload: { id, title: `New title for ${id}` }
    }
}

export function taskRemovedActionCreater(id) {
    return {
        type: TASK_DELETED,
        payload: { id }
    }
}

function reducer(state = [], action) {
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

export default reducer
