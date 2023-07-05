import { useEffect, useState } from 'react'
import {
    completeTask,
    getTasks,
    taskRemovedActionCreater,
    titleChangedActionCreater
} from '../store/tasks'
import configureStore from '../store/store'

const store = configureStore()

function App() {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.dispatch(getTasks())
        store.subscribe(() => {
            setState(store.getState())
        })
    }, [])

    const changeTitle = taskId => {
        store.dispatch(titleChangedActionCreater(taskId))
    }

    const removeTask = taskId => {
        store.dispatch(taskRemovedActionCreater(taskId))
    }

    return (
        <>
            <h1 className='mx-3 mt-3'>Redux</h1>
            <hr />
            <div className='container-fluid'>
                <ul className='mt-5'>
                    {state.map(element => (
                        <li
                            key={element.id}
                            className='mb-5'
                        >
                            <p>{element.title}</p>
                            <p>{`Completed: ${element.completed}`}</p>
                            <button
                                className='btn btn-primary'
                                onClick={() =>
                                    store.dispatch(completeTask(element.id))
                                }
                            >
                                Completed
                            </button>
                            <button
                                className='btn btn-warning mx-2'
                                onClick={() => changeTitle(element.id)}
                            >
                                Change Title
                            </button>
                            <button
                                className='btn btn-danger'
                                onClick={() => removeTask(element.id)}
                            >
                                Delete Title
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default App
