import { createAction } from '@reduxjs/toolkit'

const update = createAction('task/updated')
const remove = createAction('task/deleted')

export function taskCompletedActionCreater(id) {
    return update({ id, completed: true })
}

export function titleChangedActionCreater(id) {
    return update({ id, title: `New title for ${id}` })
}

export function taskRemovedActionCreater(id) {
    return remove({ id })
}

function reducer(state = [], action) {
    switch (action.type) {
        case update.type: {
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
        case remove.type: {
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
