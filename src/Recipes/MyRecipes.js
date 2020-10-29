import React from 'react'
import MyRecipeCard from './Cards/MyRecipeCard.js'
function MyRecipes(props){

    const renderRecipes = () => {
        return props.info.recipes.map(recipe => <MyRecipeCard key={recipe.id} recipe={recipe} />)
    }
    
    return(
        <div>My Recipes {renderRecipes()}</div>
    )
}

export default MyRecipes