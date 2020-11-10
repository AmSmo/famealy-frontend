import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import MyRecipes from './MyRecipes.js'
import Recipe from './Cards/Recipe.js'

class Recipes extends Component {

    state= {recipes: [],
            ingredients: [],
            potlucks: []}

    
    componentDidMount = () => {
        let token = localStorage.getItem("token")
        fetch('http://localhost:3001/my_info', {
            method: "GET",
            headers:
                { Authorization: `Bearer ${token}` }
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState(data)

            })
    }

    componentWillUnmount = () => {
        this.setState({
            recipes: [],
            ingredients: [],
            potlucks: []
        })
    }
    addHandler = (spoon_id) => {
        let token = localStorage.getItem("token")
        let configObj = {method: "POST",
        headers: {'content-type': "application/json",
                    'accepts': 'application/json',
                    Authorization: `Bearer ${token}`
                    }, body: JSON.stringify({spoon_id})}
        fetch('http://localhost:3001/users/add_recipe', configObj)
        .then(resp => resp.json())
        .then(data => this.setState(data))
    }

    deleteHandler = (spoon_id) => {
        const current_recipe = this.state.recipes.find(recipe => recipe.spoon_id === spoon_id)
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/user_recipes/${current_recipe.id}`, { method: "DELETE", headers: {Authorization: `Bearer ${token}`}})
        .then(resp => resp.json())
        .then(data => this.setState(data))
    }

 

    render() {
        
        return (
            <>
            

                    <Switch>
                        <Route path="/recipes/myrecipes" render={(routerprops) => <MyRecipes {...routerprops} info={this.state}   />} />
                        <Route path="/recipes/:spoon_id" render={(routerprops) => <Recipe {...routerprops} info={this.state} addHandler={this.addHandler} deleteHandler={this.deleteHandler} addIngredient={this.props.addIngredient} />} />
                    </Switch>
            </>
        )
    }
}

export default Recipes;