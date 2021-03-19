import { SET_ERROR_MESSAGE } from '../actions/session_actions'
const initialState = {
    message: ""
}
export default function session(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return action.payload
        default:
            return state
    }
}