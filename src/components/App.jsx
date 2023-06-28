import { useEffect, useState } from 'react'
import { actions, store } from '../store'

function App() {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState())
        })
    }, [])

    const completeTask = taskId => {
        store.dispatch(actions.taskCompleted(taskId))
    }

    const changeTitle = taskId => {
        store.dispatch(actions.titleChanged(taskId))
    }

    const removeTask = taskId => {
        store.dispatch(actions.taskRemoved(taskId))
    }

    return (
        <>
            <h1 className='mx-3 mb-3'>App</h1>

            <ul>
                {state.map(element => (
                    <li key={element.id}>
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
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
