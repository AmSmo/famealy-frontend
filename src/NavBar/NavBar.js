import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Input} from 'semantic-ui-react'


class NavBar extends React.Component{
    state = { activeItem: 'bio', searchValue: "" }

    handleItemClick = (e, { name }) => {
        if (name === "logout"){
            this.props.logoutHandler()
        }
        return this.setState({ activeItem: name })}
    keyHandler = (e) => {
        if (e.keyCode === 13) {
            this.props.history.push(`/search/recipe/${this.state.searchValue}`)
            this.setState({searchValue: ""})
        }
    }

    search = (e) => {

        this.setState({ searchValue: e.target.value })
    }

    render(){
            
        return(
            
        <Menu tabular style={{position: "fixed", width: "100vw", zIndex: "3", background: "white"}}>
            
            {   !this.props.user ?
                    <>
                    <Menu.Item
                        name='login'
                        active={this.state.activeItem === 'login'}
                        onClick={this.handleItemClick}
                        as={Link}
                        to="/user/login"
                    >
                        Login
                        </Menu.Item>
                    
                    <Menu.Item
                        name='signup'
                        active={this.state.activeItem === 'signup'}
                        onClick={this.handleItemClick}
                            as={Link}
                            to="/user/signup"
                    >

                    Signup
                        </Menu.Item>
                        </>
                        :
                    <>
                        <Menu.Item
                            name='logout'
                            active={this.state.activeItem === 'logout'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/user/login"
                        >
                            Logout
                        </Menu.Item>
                        <Menu.Item
                            name='myrecipes'
                            active={this.state.activeItem === 'myrecipes'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/recipes/myrecipes"
                        >
                            My Recipes
                        </Menu.Item>
                        <Menu.Item
                            name='pantry'
                            active={this.state.activeItem === 'pantry'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/pantry"
                        >
                            Pantry
                        </Menu.Item>
                        <Menu.Item
                            name='friends'
                            active={this.state.activeItem === 'friends'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/friends"
                        >
                            Friends
                        </Menu.Item>
                        <Menu.Item
                            name='potlucks'
                            active={this.state.activeItem === 'potlucks'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/potlucks/main"
                        >
                            Potlucks
                        </Menu.Item>
                        <Menu.Item
                            name='profile'
                            active={this.state.activeItem === 'profile'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/profile"
                        >
                            Profile
                        </Menu.Item>
                        <Menu.Item
                            name='calendar'
                            active={this.state.activeItem === 'calendar'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/calendar"
                        >
                            Calendar
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <form onSubmit={e => e.preventDefault()}>
                                <Menu.Item>
                                    <Input onKeyDown={this.keyHandler} onChange={this.search} name="search" value={this.state.searchValue} icon='search' placeholder='Recipe Search...' />
                                </Menu.Item>
                            </form>
                        </Menu.Menu>
                    </>
                        }
                        
        </Menu>
            
    )
    }
}

export default withRouter(NavBar)

