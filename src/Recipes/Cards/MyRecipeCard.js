import React from 'react'
import {withRouter} from 'react-router-dom'
function MyRecipeCard(props) {
    

    const clickHandler = () => {
            
            return props.getDetails(props.recipe.recipe_ingredients, props.recipe.name, props.recipe.description)
        
        
    }
  

    return (
        <div style={{width: "250px", margin: "20px"}}>
            
            <img alt={`${props.recipe.name}`} onClick={()=> props.history.push(`/recipes/${props.recipe.spoon_id}`) }style={{width: "220px"}} src={props.recipe.image_url} />
            <div onClick={() => console.log(props)}>{props.recipe.name}</div>


            <button onClick={clickHandler}> Show Details</button>
        </div>
    )
}

export default withRouter(MyRecipeCard)