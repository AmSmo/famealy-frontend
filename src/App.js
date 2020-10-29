import { Component } from 'react'
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar.js'
import styled from 'styled-components'
import User from './User/User.js'
import Search from './Search/Search.js'
import Recipes from './Recipes/Recipes.js'

const BASE_API = 'http://localhost:3001/'
class App extends Component {
  state = {user: {
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

  logoutHandler = () => {
    this.setState({
      user: {
        username: "",
        name: "",
        location: "",
        email_address: ""
      }
    })
    localStorage.removeItem("token")
    this.props.history.push("/user/ login")
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
          console.log(data)
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user })
      }else{
        return this.setState({message: data.message})
      }

      })
  }
  render(){
  return (
    <>
      <NavBar user={this.state.user.username !== ""} logoutHandler={this.logoutHandler}/>
    <Background>
      
        {this.state.user === null ?
          <Switch>

            {/* <Route path="/search/:keyword" render={(routerprops) => <SearchContainer {...routerprops} />} />
            <Route path="/login" render={(routerprops) => <Welcome {...routerprops} user={this.state.user} />} />
            <Route path="/signup" render={(routerprops) => <Signup {...routerprops} signupHandler={this.signupHandler} />} />
            <Route path="/favorites/" render={(routerprops) => <MyGallery {...routerprops} mine={true} />} />
            <Route path="/galleries/others/" render={(routerprops) => <OtherGals {...routerprops} />} />
            <Route path="/galleries/:galleryId" render={(routerprops) => <GalleryContainer {...routerprops} />} />
            <Route path="/paintings/:paintingId" render={(routerprops) => <PaintingContainer {...routerprops} />} />
            <Route path="/gallery/:userId" render={(routerprops) => <MyGallery {...routerprops} />} />
            <Route path="/maps" render={(routerprops) => <MapContainer {...routerprops} />} />
            <Route path="/" render={(routerprops) => <Welcome {...routerprops} user={this.state.user} loginHandler={this.loginHandler} setUser={this.setUser} />} /> */}
          </Switch>

          :
          <Switch>

            <Route path="/search" render={(routerprops) => <Search {...routerprops} />} />
            <Route path="/recipes" render={(routerprops) => <Recipes {...routerprops} />} />
            <Route path="/user" render={(routerprops) => <User {...routerprops} loginHandler={this.loginHandler} message={this.state.message}  />} />

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