import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    completeTask,
    getTasksLoadingStatus,
    getTasks,
    loadTasks,
    taskRemovedActionCreater,
    titleChangedActionCreater
} from '../store/tasks'
import { getErrors } from '../store/errors'

function App() {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getErrors())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [dispatch])

    const changeTitle = taskId => {
        dispatch(titleChangedActionCreater(taskId))
    }

    const removeTask = taskId => {
        dispatch(taskRemovedActionCreater(taskId))
    }

    if (isLoading) {
        return <h1 className='mx-3 mt-3'>Loading...</h1>
    } else if (error.lenght > 0) {
        return <p className='mx-3 mt-3'>{error}</p>
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
                                    dispatch(completeTask(element.id))
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
