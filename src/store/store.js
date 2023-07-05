import tasksReducer from './tasks'
import { logger } from './middleware/logger'
import { configureStore } from '@reduxjs/toolkit'

function createStore() {
    return configureStore({
        reducer: tasksReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(logger),
        devTools: import.meta.env.MODE !== 'production'
    })
}

export default createStore
