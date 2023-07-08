import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskReceived(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        taskUpdated(state, action) {
            const elementIndex = state.entities.findIndex(
                element => element.id === action.payload.id
            )
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload
            }
        },
        taskRemoved(state, action) {
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
        taskAdded(state, action) {
            state.entities.push(action.payload)
        }
    }
})

const { actions, reducer: tasksReducer } = tasksSlice
const {
    taskUpdated,
    taskRemoved,
    taskReceived,
    taskRequested,
    taskRequestFailed,
    taskAdded
} = actions

export const loadTasks = () => async dispatch => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(taskReceived(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const completeTask = id => dispatch => {
    dispatch(taskUpdated({ id, completed: true }))
}

export function titleChangedActionCreater(id) {
    return taskUpdated({ id, title: `New title for ${id}` })
}

export function taskRemovedActionCreater(id) {
    return taskRemoved({ id })
}

export const addNewTask = data => async dispatch => {
    try {
        const payload = await todosService.addTodo(data)
        dispatch(taskAdded(payload))
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const getTasks = () => state => state.tasks.entities
export const getTasksLoadingStatus = () => state => state.tasks.isLoading

export default tasksReducer
