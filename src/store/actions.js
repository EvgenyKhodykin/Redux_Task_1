import { taskDeleted, taskUpdated } from './actionTypes'

function taskCompleted(id) {
    return {
        type: taskUpdated,
        payload: { id, completed: true }
    }
}

function titleChanged(id) {
    return {
        type: taskUpdated,
        payload: { id, title: `New title for ${id}` }
    }
}

function taskRemoved(id) {
    return {
        type: taskDeleted,
        payload: { id }
    }
}

export const actions = {
    taskCompleted,
    titleChanged,
    taskRemoved
}
