import React from 'react'
import {withRouter} from 'react-router-dom'
function RecipeCard(props){
    console.log(props)
    const navigate = (spoon_id) =>{
        console.log(spoon_id)
        props.history.push(`/recipe/${spoon_id}`)
    }
    return(
        <li onClick={() => navigate(props.recipe.id)}>{props.recipe.title}</li>
        
    )
}

export default withRouter(RecipeCard)