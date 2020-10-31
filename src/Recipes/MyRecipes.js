import React from 'react'
import MyRecipeCard from './Cards/MyRecipeCard.js'
import {withRouter} from 'react-router-dom'
function MyRecipes(props){
    
    const renderRecipes = () => {
        return props.info.recipes.map(recipe => <MyRecipeCard key={recipe.id} recipe={recipe} history={props.history}/>)
    }
    
    return(
        <div>My Recipes {renderRecipes()}</div>
    )
}

export default withRouter(MyRecipes)