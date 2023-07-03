import { legacy_createStore as createStore } from 'redux'
import tasksReducer from './tasks'

function configureStore() {
    return createStore(
        tasksReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}

export default configureStore
