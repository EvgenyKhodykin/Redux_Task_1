import tasksReducer from './tasks'
import { logger } from './middleware/logger'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import errorsReducer from './errors'

const rootReduceer = combineReducers({
    errors: errorsReducer,
    tasks: tasksReducer
})

function createStore() {
    return configureStore({
        reducer: rootReduceer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(logger),
        devTools: import.meta.env.MODE !== 'production'
    })
}

export default createStore
