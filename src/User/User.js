import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Signup from './Signup.js'
import Login from './Login.js'
import FriendSearchForm from '../Search/forms/FriendSearchForm'
class Search extends Component {


    render() {
        return (
            <>

                {this.props.user === null ?
                    <div> SOMETHING</div>

                    :
                    <Switch>

                        <Route path="/user/search" render={(routerprops) => <FriendSearchForm {...routerprops} />} />
                        <Route path="/user/login" render={(routerprops) => <Login {...routerprops} loginHandler={this.props.loginHandler} message={this.props.message}/>} />
                        <Route path="/user/signup" render={(routerprops) => <Signup {...routerprops} signupHandler={this.props.signupHandler} />} />
                    </Switch>
                }

            </>
        );
    }
}

export default Search;