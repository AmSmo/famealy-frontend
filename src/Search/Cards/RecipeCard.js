import React from 'react'
import {withRouter} from 'react-router-dom'

import {Card} from 'semantic-ui-react'

function RecipeCard(props){
    
    const navigate = (spoon_id) =>{
        
        props.history.push(`/recipes/${spoon_id}`)
    }
    return(
        <Card 
            onClick={() => navigate(props.recipe.id)}
            image={`https://spoonacular.com/recipeImages/${props.recipe.image}`}
            header={props.recipe.title}
            meta= {`Ready in ${props.recipe.readyInMinutes} minutes`  }
            description= {`Servings: ${props.recipe.servings}`}
                
        />
        
    )
}

export default withRouter(RecipeCard)
