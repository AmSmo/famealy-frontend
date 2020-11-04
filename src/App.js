import { Component } from 'react'
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar.js'
import styled from 'styled-components'
import User from './User/User.js'
import Search from './Search/Search.js'
import Recipes from './Recipes/Recipes.js'
import PantryContainer from './Pantry/PantryContainer.js'
import FriendsContainer from './User/FriendsContainer'
import PotluckContainer from './Potluck/PotluckContainer'
import Profile from './User/Profile'
const BASE_API = 'http://localhost:3001/'
class App extends Component {
  state = { user: {
    username: "",
    name: "",
    location: "",
    email_address: "",
    recipes: []
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
        this.props.history.push("/")
      })
  }


  logoutHandler = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    
    this.setState({
          user: {
            username: "",
            name: "",
            location: "",
            email_address: ""
          }
        })
    this.props.history.push("/")
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
          localStorage.setItem("user", data.user.id) 
        this.setState({ user: data.user, message: "" })
        this.props.history.push("/")
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
            <Route path="/" render={(routerprops) => <User {...routerprops} loginHandler={this.loginHandler} signupHandler={this.signupHandler} message={this.state.message} />} />
            
          </Switch>

          :
          <Switch>

            <Route path="/search" render={(routerprops) => <Search {...routerprops} />} />
            <Route path="/potlucks" render={(routerprops) => <PotluckContainer {...routerprops} />} />
            <Route path="/recipes" render={(routerprops) => <Recipes {...routerprops} />} />
            <Route path="/user" render={(routerprops) => <User {...routerprops} loginHandler={this.loginHandler} signupHandler={this.signupHandler} message={this.state.message}  />} />
            <Route path="/pantry" render={(routerprops) => <PantryContainer {...routerprops} /> } />
            <Route path="/friends" render={(routerprops) => <FriendsContainer {...routerprops} /> } />
            <Route path="/" render={(routerprops) => <Profile {...routerprops} user={this.state.user}  />} />
          </Switch>
        }
    </Background>
    </>
  );}
}

export default withRouter(App);

const Background=styled.div`
padding-top: 10px;


top: 60px;
height: 90vh;
width: 100vw;
display: inline-table;
text-align: center;
margin: 0 auto;
position: relative;
`