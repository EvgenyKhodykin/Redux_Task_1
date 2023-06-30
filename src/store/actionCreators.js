import { TASK_DELETED, TASK_UPDATED } from './actionTypes'

export function taskCompletedCreator(id) {
    return {
        type: TASK_UPDATED,
        payload: { id, completed: true }
    }
}

export function titleChangedCreator(id) {
    return {
        type: TASK_UPDATED,
        payload: { id, title: `New title for ${id}` }
    }
}

export function taskRemovedCreator(id) {
    return {
        type: TASK_DELETED,
        payload: { id }
    }
}
