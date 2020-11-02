import React from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
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

const Recipe = styled.div`
margin: 30px;
max-width: 250px;

border: .1px solid black;    `

const Photo = styled.img`
    margin: 20px 10px;
    max-height: 280px;
    width: 220px;
`