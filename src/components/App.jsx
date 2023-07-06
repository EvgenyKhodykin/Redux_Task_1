import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    completeTask,
    getTasksLoadingStatus,
    getTasks,
    loadTasks,
    taskRemovedActionCreater,
    titleChangedActionCreater,
    addNewTask
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

    const addTask = () => {
        const title = prompt('Enter a title of a new task', 'new task')
        dispatch(addNewTask(title))
    }

    if (isLoading) {
        return <h1 className='mx-3 mt-3'>Loading...</h1>
    } else if (error.lenght > 0) {
        return <p className='mx-3 mt-3'>{error}</p>
    }

    return (
        <>
            <div className='container-fluid'>
                <h1 className=''>Redux</h1>
                <button
                    className='btn btn-success'
                    onClick={addTask}
                >
                    Add New Task
                </button>
            </div>
            <hr />
            <div className='container mx-0'>
                <div className='row row-cols-3'>
                    {state.map(element => (
                        <div
                            key={element.id}
                            className='col border mb-2 mx-2'
                        >
                            <p>Title: {element.title}</p>
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
                                Delete Task
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
