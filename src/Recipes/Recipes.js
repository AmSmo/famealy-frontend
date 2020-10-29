import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import MyRecipes from './MyRecipes.js'
import Recipe from './Cards/Recipe.js'
let token = localStorage.getItem("token")
class Recipes extends Component {

    state= {recipes: [],
            ingredients: [],
            potlucks: []}

    componentDidMount = () => {
        
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

    addHandler = (spoon_id) => {
        
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
        
        fetch(`http://localhost:3001/user_recipes/${current_recipe.id}`, { method: "DELETE", headers: {Authorization: `Bearer ${token}`}})
        .then(resp => resp.json())
        .then(data => this.setState(data))
    }

    render() {
        console.log("render upper", this.state)
        return (
            <>
            <div>LALSLAS</div>

                    <Switch>
                        <Route path="/recipes/myrecipes" render={(routerprops) => <MyRecipes {...routerprops} info={this.state}  />} />
                        <Route path="/recipes/:spoon_id" render={(routerprops) => <Recipe {...routerprops} info={this.state} addHandler={this.addHandler} deleteHandler={this.deleteHandler} />} />
                    </Switch>
            </>
        )
    }
}

export default Recipes;