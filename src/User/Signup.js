import styled from 'styled-components'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {Message} from 'semantic-ui-react'

function Signup(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const changeHandler = (e) => {
        switch (e.target.name) {
            case "username":
                setUsername(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            case "passwordConfirmation":
                setPasswordConfirmation(e.target.value)
                break;
            case "email":
                setEmail(e.target.value)
                break;
            case "location":
                setLocation(e.target.value)
                break;
            default:
                break;
        }

    }

    const invalidPassword = (password !== passwordConfirmation && password !== "" && passwordConfirmation !== "")

    const pwValidation = (e) => {
        if (invalidPassword) {
            alert("Passwords Do Not Match")
        } else if (username === "") {
            alert("Must have a username")
        } else if (email === "") {
            alert("Must have an email")
        } else if (location === "") {
            alert("Must have a location")
        }

        else {
            return props.signupHandler(e)
        }
    }
    let result = <></>
    if (!localStorage.getItem("token")) {
        result =
            <>
                <p style={head}>Welcome to FaMealy</p>

                <div style={loginStyle}>

                    <div style={{ maxWidth: 450 }}>
                        <h2>
                            Signup for an account
                         </h2>
                        <form size='large' onSubmit={props.loginHandler}>
                            <>
                                <input type="text" onChange={changeHandler} value={username} name="username"  placeholder='Username' />
                                <input type="email" onChange={changeHandler} value={email} name="email"  placeholder='Email' />
                                <input type="text" onChange={changeHandler} value={location} name="location"  placeholder='Location' />
                                <input type="password"
                                    
                                    icon='lock'
                                    name="password"
                                    
                                    placeholder='Password'
                                    onChange={changeHandler}
                                    value={password}
                                />
                            <input type="password"
                                
                                onChange={changeHandler}
                                name="passwordConfirmation"
                                icon='lock'
                                
                                placeholder='Password Confirmation'
                            />
                            {invalidPassword ? <Message size="tiny" color='red'>Passwords do not match</Message> : null} 

                                <Button>
                                    Signup
                                </Button>
                            </>
                        </form>
                        <div>
                            Already a Member? <NavLink to="/user/login">Login</NavLink>
                        </div>
                    </div>

                </div>
            </>

    }
    return (result)
}
export default Signup

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
const imgStyle = {
    // height: "600px",
    left: "50%",
    marginTop: "-31vh",
    marginLeft: "-600px",
    position: "absolute",
    top: "50%",
    width: "1200px",



}
const head = {
    fontSize: "4em",
}
const loginStyle = {
    background: "#4CD4A9",
    width: "250px",
    height: "300px",
    border: ".1px solid black",
    display: "block",
    margin: "30px auto",
    padding: "20px"
}