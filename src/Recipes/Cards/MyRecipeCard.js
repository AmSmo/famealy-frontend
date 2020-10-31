import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
function MyRecipeCard(props) {
    const [clicked, setClicked] = useState(false)
    return (
        <div>
            
            <img onClick={()=> props.history.push(`/recipes/${props.recipe.spoon_id}`) }style={{width: "220px"}} src={props.recipe.image_url} />
            <div onClick={() => console.log(props)}>{props.recipe.name}</div>

            {clicked ? 
            <>
                <ul>
                    {props.recipe.recipe_ingredients.map(ing => {return <li>{(ing.ingredient.name)}</li>}) }
                </ul>
                    <button onClick={() => setClicked(!clicked)}>Hide Ingredients</button>
            </>
            :
            <button onClick={() => setClicked(!clicked)}> Show Ingredients</button>
            }
        </div>
    )
}

export default withRouter(MyRecipeCard)