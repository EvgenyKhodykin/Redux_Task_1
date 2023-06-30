import { useEffect, useState } from 'react'
import { store, taskCompleted, taskRemoved, titleChanged } from '../store'

function App() {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState())
        })
    }, [])

    const completeTask = taskId => {
        store.dispatch(taskCompleted(taskId))
    }

    const changeTitle = taskId => {
        store.dispatch(titleChanged(taskId))
    }

    const removeTask = taskId => {
        store.dispatch(taskRemoved(taskId))
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
                                onClick={() => completeTask(element.id)}
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
