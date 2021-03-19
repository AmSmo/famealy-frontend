import axios from 'axios'

const BASE_API = 'http://localhost:3001/'
export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
export const LOGOUT = "LOGOUT"


export const getUser = async () => {
    let resp = await axios.get(BASE_API + "auth")
    return resp.data
}

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};


export const signupHandler = (e, user) => {

    e.preventDefault()
    const data = new FormData(e.target)
    let configObj = {
        method: "POST",
        headers: {
            "accepts": "application/json",

        },
        body: data
    }

    fetch(BASE_API + 'users', configObj)
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("user", data.user.id)
            localStorage.setItem("token", data.jwt)
            this.setState({ user: data.user })

        })
        .then(() => {
            this.getUser()
            this.props.history.push("/")
        })
}

export const logout = () => dispatch => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch(resetUser())
}
export const resetUser = () => ({
    type: LOGOUT,
})
export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: { user }
})

export const setErrorMessage = (message) => ({
    type: SET_ERROR_MESSAGE,
    payload: message
})

export const login = user => async (dispatch) => {
    dispatch(setErrorMessage(""))
    let { data } = await axios.post(BASE_API + 'login', { user })
    console.log(data)
    if (data.jwt) {
        localStorage.setItem("token", data.jwt)
        dispatch(setCurrentUser(data.user))
    } else {
        dispatch(setErrorMessage(data.message))
    }

}
