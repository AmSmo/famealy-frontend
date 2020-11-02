import React, { useEffect, useState } from 'react'
import MyRecipeCard from './Cards/MyRecipeCard.js'
import {withRouter} from 'react-router-dom'
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
function MyRecipes(props){
    const [ingredients, setIngredients] = useState([])
    const [currentRecipe, setCurrentRecipe] = useState("")
    const [description, setDescription] = useState("")
    const getDetails = (ingreds, thisRecipe, description) => {
        
        setIngredients(ingreds)
        setCurrentRecipe(thisRecipe)
        setDescription(description)
        
    }
    const renderRecipes = () => {
        return props.info.recipes.map(recipe => <MyRecipeCard key={recipe.id} recipe={recipe} history={props.history} getDetails={getDetails}/>)
    }

    useEffect(()=> 
        {renderIng()},[]
    )
    const clearDetails =() => {
        setIngredients([])
      
        setDescription("")
        setCurrentRecipe("")
    }
    const renderIng = () => {
        if (ingredients.length > 0){
        return ingredients.map(ing => {
            return <li>{(ing.ingredient.name)}</li>
        })}else{
            return null
        }
    }
    
    return(
         <Segment style={{margin: "0 10px"}}inverted>
                
                {props.info.recipes.length > 0 ?
                    <>
                        <h2>Recipes</h2>
                        <div style={{width: "80vw", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                            {renderRecipes()}
                        </div>
                        </>
                    :
                    null
                }
                
                {ingredients.length > 0?
            <>
            <Divider style={{ margin: "10px" }} inverted />
                <h2>Details {currentRecipe !== "" ? <span>for {currentRecipe}</span> : null}</h2>
                    
                    <button onClick={clearDetails}>Clear Details</button>

                    
                    <Segment style={{ margin: "10px 40px" }}>
                        
                        <Grid columns={2} relaxed='very' >
                            <Grid.Column>
                                {ingredients.length > 0 ?
                                    <>
                                        <h2>Ingredients Required</h2>
                                        <div>
                                            {renderIng()}
                                        </div>
                                    </>
                                    :
                                    null
                                }

                            </Grid.Column>
                            <Divider vertical></Divider>
                            <Grid.Column>
                                {description}
                            </Grid.Column>


                        </Grid>
                    </Segment>
                        
                    </> 
                    : 
                    null
                    }
                    
    
            </Segment>
    )
}

export default withRouter(MyRecipes)