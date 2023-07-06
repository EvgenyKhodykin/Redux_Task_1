import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'

const initialState = { entities: [], isLoading: true, error: null }

const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        received(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                element => element.id === action.payload.id
            )
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload
            }
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                element => element.id !== action.payload.id
            )
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: tasksReducer } = tasksSlice
const { update, remove, received, taskRequested, taskRequestFailed } = actions

export const getTasks = () => async dispatch => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(received(data))
    } catch (error) {
        dispatch(taskRequestFailed(error.message))
    }
}

export const completeTask = id => dispatch => {
    dispatch(update({ id, completed: true }))
}

export function titleChangedActionCreater(id) {
    return update({ id, title: `New title for ${id}` })
}

export function taskRemovedActionCreater(id) {
    return remove({ id })
}

export default tasksReducer
