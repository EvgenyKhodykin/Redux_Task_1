import {
    applyMiddleware,
    legacy_createStore as createStore,
    compose
} from 'redux'
import tasksReducer from './tasks'
import { logger } from './middleware/logger'
import { thunk } from './middleware/thunk'

const middlewareEnhancer = applyMiddleware(logger, thunk)

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
