import { createSlice } from '@reduxjs/toolkit'

const initialState = { entities: [] }

const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        set(state, action) {
            state.entities.push(action.payload)
        }
    }
})

const { actions, reducer: errorsReducer } = errorsSlice
const { set } = actions

export const setError = message => dispatch => {
    dispatch(set(message))
}

export const getErrors = () => state => state.errors.entities

export default errorsReducer
