import styled from 'styled-components'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { login } from "../actions/session_actions"
function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (e) => {
        e.preventDefault()
        props.login({ username, password })
        setUsername("")
        setPassword("")
    }
    const changeHandler = (e) => {
        switch (e.target.name) {
            case "username":
                setUsername(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            default:

                break;

        }
    }
    let result = <></>
    if (!localStorage.getItem("token")) {
        result = (
            <Background>
                <p style={head}>Welcome to</p>
                <img alt="logo" src={"/assets/famealy.png"} style={{ width: "40vw" }} />
                <p style={{ fontWeight: "700", fontSize: "2em" }}>Let's Start Cooking!</p>

                <div style={loginStyle}>

                    <div style={{ maxWidth: 450 }}>
                        <h2>
                            Log-in to your account
                        </h2>
                        <form onSubmit={loginHandler} size='large'>
                            <Fields>
                                <input type="text" onChange={changeHandler} value={username} name="username" placeholder='Username' />
                                <input type="password"

                                    icon='lock'
                                    name="password"

                                    placeholder='Password'
                                    onChange={changeHandler}
                                    value={password}
                                />

                                <Button onClick={loginHandler}>
                                    Login
                                </Button>
                                {props.message !== "" ? <Message>{props.message}</Message> : null}
                            </Fields>
                        </form>
                        <div style={{ fontSize: "17px", fontWeight: "600" }}>
                            New to us? <NavLink to="/user/signup">Sign Up</NavLink>
                        </div>
                    </div>

                </div>
            </Background>)

    }
    return (result)
}

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(login(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)

const Button = styled.button`
    margin: 0 auto;
    background-color: #22D9E3;
    border: 2px solid white;
    color: black;
    padding: 2px 16px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 20px;
`

const head = {
    fontSize: "4em",
    fontWeight: "600",
    marginBottom: "0px"
}
const loginStyle = {
    background: "rgba(255,255,255,0.5)",
    width: "250px",
    height: "300px",
    border: ".1px solid black",
    display: "block",
    margin: "30px auto",
    padding: "20px"
}

const Background = styled.div`
    background-image: url("/assets/splashback.jpg");
    height: 95.3vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat
    
`


const Fields = styled.div`
    line-height: 2.2em;
    input{
         
         border-radius: 8px; 
         height: 1.8em  
     }
`