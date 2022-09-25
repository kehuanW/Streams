import _ from 'lodash'
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types'


// reducer就是一个方法
// inital state，加工state
const INITIAL_STATE = {}
export const streamReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case CREATE_STREAM:
            return { ...state, [payload.id]: payload.id }
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(payload, 'id') }
        case FETCH_STREAM:
            return { ...state, [payload.id]: payload }
        case DELETE_STREAM:
            return _.omit(state, payload)
        case EDIT_STREAM:
            return { ...state, [payload.id]: payload }
        default:
            return state
    }
}