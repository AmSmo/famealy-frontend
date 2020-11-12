
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Message } from 'semantic-ui-react'
import styled from 'styled-components'
function Signup(props) {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [location, setLocation] = useState('')

    const signupHandler = (e) => {
        e.preventDefault()
        const user = {username, name, password, email_address: emailAddress, location}
        
        props.signupHandler(e, user)
    }
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
            case "email_address":
                setEmailAddress(e.target.value)
                break;
            case "name":
                setName(e.target.value)
                break;
            case "location":
                setLocation(e.target.value)
                break;
            default:
                break;
        }

    }

    const invalidPassword = (password !== passwordConfirmation && password !== "" && passwordConfirmation !== "")

    const pwValidation = () => {
        
        if (invalidPassword) {
            alert("Passwords Do Not Match")
            return false
        } else if (username === "") {
            alert("Must have a username")
            return false
        } else if (emailAddress === "") {
            alert("Must have an email address")
            return false
        } else if (location === "") {
            alert("Must have a location")
            return false
        } else if (name === "") {
            alert("Must have a name")
            return false
        } else {
            return true
        }
    }
    let result = <></>
    if (!localStorage.getItem("token")) {
        result =
            <Background>
                <p style={head}>Welcome to</p>
            <img alt="logo" src={"/assets/famealy.png"} style={{ width: "40vw" }} />
                <div style={loginStyle}>

                    <div style={{ maxWidth: 450 }}>
                        <h2>
                            Signup for an Account
                         </h2>
                        <form size='large' onSubmit={(e) => signupHandler(e)} >
                            <Fields>
                                <input type="text" onChange={changeHandler} value={username} name="username"  placeholder='Username' />
                                <input type="text" onChange={changeHandler} value={name} name="name"  placeholder='Name' />
                                <input type="email" onChange={changeHandler} value={emailAddress} name="email_address"  placeholder='Email Address' />
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
                            
                            <input type="file" className="photo" name="profile" style={{width:"95px", border: "none", marginTop: "10px", marginBottom: "30px", textAlign: "center"}}  / >
                            
                            {invalidPassword ? <Message size="tiny" color='red'>Passwords do not match</Message> : null} 

                            <Button>Sign Up</Button>
                                  
                            </Fields>
                        </form>
                    <div style={{ fontSize: "17px", fontWeight: "600" }}>
                            Already a Member? <NavLink to="/user/login">Login</NavLink>
                        </div>
                    </div>

                </div>
            </Background>

    }
    return (result)
}
export default Signup


const head = {
    fontSize: "4em",
    marginBottom: "0px",
    fontWeight: "600"
}
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
const loginStyle = {
    background: "rgba(255,255,255,0.5)",
    width: "250px",
    height: "430px",
    border: ".1px solid black",
    display: "block",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px"
}

const Background = styled.div`
    background-image: url("/assets/splashback.jpg");
    height: 95vh;
    width: 100vw;
    display: inline-table;
    
`

const Fields = styled.div`
    line-height: 2.2em;
    input{
         
         border-radius: 8px; 
         height: 1.8em  
     }
`

