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
import Calendar from './Calendar/Calendar'
import Profile from './User/Profile'
import Edit from './User/Edit'
import { connect } from 'react-redux'
const BASE_API = 'http://localhost:3001/'
class App extends Component {



  render() {

    return (
      <>
        <NavBar />
        <Background>

          {/* {this.props.user === null ? */}
          <Switch>
            <Route path="/user" render={(routerprops) => <User {...routerprops} />} />
            <Route path="/" render={(routerprops) => <User {...routerprops} />} />

          </Switch>
          {/* 
            :
            <Switch>

              <Route path="/search" render={(routerprops) => <Search {...routerprops} />} />
              <Route path="/potlucks" render={(routerprops) => <PotluckContainer {...routerprops} changeTop={this.changeTop} fixGuests={this.fixGuests} />} />
              <Route path="/recipes" render={(routerprops) => <Recipes {...routerprops} changeTop={this.getUser} addIngredient={this.addIngredient} />} />
              <Route path="/user" render={(routerprops) => <User {...routerprops} loginHandler={this.loginHandler} signupHandler={this.signupHandler} message={this.state.message} />} />
              <Route path="/pantry" render={(routerprops) => <PantryContainer {...routerprops} />} />
              <Route path="/friends" render={(routerprops) => <FriendsContainer {...routerprops} fixTop={this.fixTop} />} />
              <Route path="/calendar" render={(routerprops) => <Calendar {...routerprops} user={this.state.user} />} />
              <Route path="/edit" render={(routerprops) => <Edit {...routerprops} user={this.state.user} />} />

              <Route path="/" render={(routerprops) => <Profile {...routerprops} user={this.state.user} />} />
            </Switch>
          } */}
        </Background>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

const Background = styled.div`
padding-top: 10px;


top: 37px;
height: 90vh;
width: 100vw;
display: inline-table;
text-align: center;
margin: 0 auto;
position: relative;
`