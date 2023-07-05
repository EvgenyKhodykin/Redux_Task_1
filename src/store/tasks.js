import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'

const initialState = []

const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        set(state, action) {
            return action.payload
        },
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
const { update, remove, set } = actions

export const getTasks = () => async dispatch => {
    try {
        const data = await todosService.fetch()
        dispatch(set(data))
    } catch (error) {
        console.log(error)
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
