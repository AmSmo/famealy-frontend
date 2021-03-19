import { LOGOUT, SET_CURRENT_USER } from '../actions/session_actions'

const initialState = {

    username: "",
    name: "",
    location: "",
    email_address: "",
    potlucks: [],
    ingredients: []

}

export default function session(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.payload
        case LOGOUT:
            return initialState
        default:
            return state
    }
}