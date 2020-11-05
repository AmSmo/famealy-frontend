import React from 'react'
import MyRecipeCard from './Cards/MyRecipeCard.js'
import {withRouter} from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import SearchForm from '../Search/SearchForm'
function MyRecipes(props){
   
    const renderRecipes = () => {
        return props.info.recipes.map(recipe => <MyRecipeCard key={recipe.id} recipe={recipe} history={ props.history} />)
    }

    return(
         <Segment style={{margin: "0 10px"}}    >
                
                {props.info.recipes.length > 0 ?
                    <>
                        <h2>Recipes</h2>
                        <div style={{width: "80vw", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                            {renderRecipes()}
                        </div>
                        </>
                    :
                    <>
                <h2>You don't have any recipes</h2>
                <p>Search for some:</p>
                <SearchForm />
                </>
                }

            </Segment>
    )
}

export default withRouter(MyRecipes)