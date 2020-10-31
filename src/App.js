import { Component } from 'react'
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar.js'
import styled from 'styled-components'
import User from './User/User.js'
import Search from './Search/Search.js'
import Recipes from './Recipes/Recipes.js'
import PantryContainer from './Pantry/PantryContainer.js'
const BASE_API = 'http://localhost:3001/'
class App extends Component {
  state = { user: {
    username: "",
    name: "",
    location: "",
    email_address: ""
  },
  message: ""}

  componentDidMount = () => {
    let token = localStorage.getItem("token")
    if (token) {
      fetch(BASE_API + "auth", {
        method: "GET",
        headers:
          { Authorization: `Bearer ${token}` }
      })
        .then(resp => resp.json())
        .then(data => {
          this.setState({ user: data.user })

        })

    }
  }


  signupHandler = (e, user) => {
    e.preventDefault()
    let configObj = {
      method: "POST",
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user })
    }

    fetch(BASE_API + 'users', configObj)
      .then(resp => resp.json())
      .then(data => {
        
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user })
        this.props.history.push("/")
      })
  }


  logoutHandler = () => {
    localStorage.removeItem("token")
    
    this.setState({
          user: {
            username: "",
            name: "",
            location: "",
            email_address: ""
          }
        })
    this.props.history.push("/user/login")
  }
  
  loginHandler = (e, user) => {
    e.preventDefault()
    let configObj = {
      method: "POST",
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user })
    }
    fetch(BASE_API + 'login', configObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.jwt){
          
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user, message: "" })
        return true
      }else{
        this.setState({message: data.message})
        return false
      }

      })
  }
  render(){
  return (
    <>
      <NavBar user={this.state.user.username !== ""} logoutHandler={this.logoutHandler}/>
    <Background>
      
        {this.state.user.username === "" ?
          <Switch>
            <Route path="/user" render={(routerprops) => <User {...routerprops} loginHandler={this.loginHandler} signupHandler={this.signupHandler} message={this.state.message} />} />
            
          </Switch>

          :
          <Switch>

            <Route path="/search" render={(routerprops) => <Search {...routerprops} />} />
            <Route path="/recipes" render={(routerprops) => <Recipes {...routerprops} />} />
            <Route path="/user" render={(routerprops) => <User {...routerprops} loginHandler={this.loginHandler} signupHandler={this.signupHandler} message={this.state.message}  />} />
            <Route path="/pantry" render={(routerprops) => <PantryContainer {...routerprops} /> } />
          </Switch>
        }
    </Background>
    </>
  );}
}

export default withRouter(App);

const Background=styled.div`
padding-top: 10px;
background:  #fabc0f;
height: 100vh;
width: 100vw;
display: block;
text-align: center;
margin: 0 auto;
`