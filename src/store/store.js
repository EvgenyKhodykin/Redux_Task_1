import { legacy_createStore as createStore } from 'redux'
import tasksReducer from './tasks'

function configureStore() {
    return createStore(tasksReducer)
}

export default configureStore
