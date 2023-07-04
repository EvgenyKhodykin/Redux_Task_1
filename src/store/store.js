import {
    applyMiddleware,
    legacy_createStore as createStore,
    compose
} from 'redux'
import tasksReducer from './tasks'
import { logger } from './middleware/logger'

const middlewareEnhancer = applyMiddleware(logger)

function configureStore() {
    return createStore(
        tasksReducer,
        compose(
            middlewareEnhancer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )
}

export default configureStore
