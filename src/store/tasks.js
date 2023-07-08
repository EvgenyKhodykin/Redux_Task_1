import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        received(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        updated(state, action) {
            const elementIndex = state.entities.findIndex(
                element => element.id === action.payload.id
            )
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload
            }
        },
        removed(state, action) {
            state.entities = state.entities.filter(
                element => element.id !== action.payload.id
            )
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state) {
            state.isLoading = false
        },
        added(state, action) {
            state.entities.push(action.payload)
        }
    }
})

const { actions, reducer: tasksReducer } = tasksSlice
const { updated, removed, received, taskRequested, taskRequestFailed, added } =
    actions

export const loadTasks = () => async dispatch => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(received(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const completeTask = id => dispatch => {
    dispatch(updated({ id, completed: true }))
}

export function titleChangedActionCreater(id) {
    return updated({ id, title: `New title for ${id}` })
}

export function taskRemovedActionCreater(id) {
    return removed({ id })
}

export const addNewTask = data => async dispatch => {
    try {
        const payload = await todosService.addTodo(data)
        dispatch(added(payload))
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const getTasks = () => state => state.tasks.entities
export const getTasksLoadingStatus = () => state => state.tasks.isLoading

export default tasksReducer
