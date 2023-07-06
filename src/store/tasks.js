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
        taskRequestFailed(state) {
            state.isLoading = false
        },
        add(state, action) {
            state.entities.push(action.payload)
        }
    }
})

const { actions, reducer: tasksReducer } = tasksSlice
const { update, remove, received, taskRequested, taskRequestFailed, add } =
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
    dispatch(update({ id, completed: true }))
}

export function titleChangedActionCreater(id) {
    return update({ id, title: `New title for ${id}` })
}

export function taskRemovedActionCreater(id) {
    return remove({ id })
}

export const addNewTask = newTaskTitle => async dispatch => {
    try {
        const data = {
            userId: 1,
            id: Date.now(),
            title: newTaskTitle,
            completed: false
        }
        await todosService.addTodo(data)
        dispatch(add(data))
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const getTasks = () => state => state.tasks.entities
export const getTasksLoadingStatus = () => state => state.tasks.isLoading

export default tasksReducer
