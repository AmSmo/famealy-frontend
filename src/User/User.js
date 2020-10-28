import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Signup from './Signup.js'
import Login from './Login.js'
class Search extends Component {


    render() {
        return (
            <>

                {this.props.user === null ?
                    <div> SOMETHING</div>

                    :
                    <Switch>

                        <Route path="/user/login" render={(routerprops) => <Login {...routerprops} loginHandler={this.loginHandler} />} />
                        <Route path="/user/signup" render={(routerprops) => <Signup {...routerprops} loginHandler={this.loginHandler} />} />
                    </Switch>
                }

            </>
        );
    }
}

export default Search;