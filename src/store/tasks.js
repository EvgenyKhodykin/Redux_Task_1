import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false }
]

const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        update(state, action) {
            const elementIndex = state.findIndex(
                element => element.id === action.payload.id
            )
            state[elementIndex] = {
                ...state[elementIndex],
                ...action.payload
            }
        },
        remove(state, action) {
            return state.filter(element => element.id !== action.payload.id)
        }
    }
})

const { actions, reducer: tasksReducer } = tasksSlice
const { update, remove } = actions

export function taskCompletedActionCreater(id) {
    return update({ id, completed: true })
}

export function titleChangedActionCreater(id) {
    return update({ id, title: `New title for ${id}` })
}

export function taskRemovedActionCreater(id) {
    return remove({ id })
}

export default tasksReducer
