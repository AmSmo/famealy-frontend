import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import MyRecipes from './MyRecipes.js'
import Recipe from './Card/Recipe.js'
class Recipes extends Component {


    render() {
        return (
            <>

                    <Switch>
                        <Route path="/recipes/myrecipes" render={(routerprops) => <MyRecipes {...routerprops}  />} />
                        <Route path="/recipes/:spoon_id" render={(routerprops) => <Recipe {...routerprops}  />} />
                    </Switch>
            </>
        )
    }
}

export default Recipes;