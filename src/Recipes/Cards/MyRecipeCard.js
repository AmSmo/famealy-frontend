import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {Popup, Grid, Divider} from 'semantic-ui-react'
function MyRecipeCard(props) {
    
    const renderIng = () => {
            return props.recipe.recipe_ingredients.map(ing => {
                return <li>{(ing.ingredient.name)}</li>
            })
        }


    return (
        <div style={{width: "250px", margin: "20px"}}>
            
            <Popup trigger={<Link><img alt={`${props.recipe.name}`} onClick={() => props.history.push(`/recipes/${props.recipe.spoon_id}`)} style={{ width: "220px" }} src={props.recipe.image_url} /></Link>} hoverable style={style}>
                Head to Recipe
            </Popup>
            <div>{props.recipe.name}</div>

            <Popup trigger={<button> Quick Details</button>} flowing hoverable on='click'>
                    <Grid columns={2}>
                        <Grid.Column style={{width:"320px", listStyle: "none", textTransform: "capitalize", marginLeft: "43px"}}>
                            
                                
                                    <h2>Ingredients Required</h2>
                                    <div>
                                        {renderIng()}
                                    </div>

                        </Grid.Column>
                        <Divider vertical></Divider>
                        <Grid.Column style={{ width: "320px" }}>
                            {props.recipe.description}
                        </Grid.Column>

                    </Grid>
           </Popup>
        </div>
    )
}

export default withRouter(MyRecipeCard)

const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '2em',
}