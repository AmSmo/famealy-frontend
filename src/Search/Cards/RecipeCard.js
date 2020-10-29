import React from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
function RecipeCard(props){
    
    const navigate = (spoon_id) =>{
        
        props.history.push(`/recipes/${spoon_id}`)
    }
    return(
        <Recipe onClick={() => navigate(props.recipe.id)}>
            <Photo src={`https://spoonacular.com/recipeImages/${props.recipe.image}`}/>
            <p>Ready in {props.recipe.readyInMinutes} minutes   </p>
            <p>Servings: {props.recipe.servings}</p>

                {props.recipe.title}
                
        </Recipe>
        
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