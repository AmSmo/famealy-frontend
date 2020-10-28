import { Component } from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar.js'
import styled from 'styled-components'
import User from './User/User.js'
import Search from './Search/Search.js'
class App extends Component {


  render(){
  return (
    <>
      <NavBar />
    <Background>
      
        {this.props.user === null ?
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
            <Route path="/user" component={User} />

          </Switch>
        }
    </Background>
    </>
  );}
}

export default App;

const Background=styled.div`
padding-top: 10px;
background:  #fabc0f;
height: 100vh;
width: 100vw;
display: block;
text-align: center;
margin: 0 auto;
`