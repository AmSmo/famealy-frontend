import styled from 'styled-components'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


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
        result =
                <>
                <p style={head}>Welcome to FaMealy</p>
                
                <div style={loginStyle}>
                
                    <div style={{ maxWidth: 450 }}>
                        <h2>
                            Log-in to your account
                        </h2>
                        <form size='large' onSubmit={props.loginHandler}>
                            <>
                                <input type="text" onChange={changeHandler} value={username} name="username" placeholder='Username' />
                                <input type="password"
                                    
                                    icon='lock'
                                    name="password"
                                    
                                    placeholder='Password'
                                    onChange={changeHandler}
                                    value={password}
                                />

                                <Button>
                                    Login
                                </Button>
                            </>
                        </form>
                        <div>
                            New to us? <NavLink to="/signup">Sign Up</NavLink>
                        </div>
                    </div>
                
            </div>
            </>

    }
    return (result)
}
export default Login

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