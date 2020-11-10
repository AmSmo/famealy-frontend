import React from 'react'
import styled from 'styled-components'
import {withRouter, Link} from 'react-router-dom'
import {Popup, Grid, Divider} from 'semantic-ui-react'
function MyRecipeCard(props) {
    
    const renderIng = () => {
            return props.recipe.recipe_ingredients.map(ing => {
                return <li>{(ing.ingredient.name)}</li>
            })
        }

// style={{border: "0.5px #fff solid", background: "rgba(255,255,255,0.5)"}} 
    return (
        <div style={{ width: "250px", height: "280px", margin: "20px", display: "grid", border: "0.5px grey solid", background: "rgba(247, 238, 238)", borderRadius: "10px"}}>
            
            <Popup  trigger={<Link><img alt={`${props.recipe.name}`} onClick={() => props.history.push(`/recipes/${props.recipe.spoon_id}`)} style={{ width: "220px", maxHeight:"180px" }} src={props.recipe.image_url} /></Link>} basic hoverable style={style}>
                Head to Recipe
            </Popup>
            <div>{props.recipe.name}</div>

            <Popup trigger={<Button> Quick Details</Button>} flowing hoverable on='click'>
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

const Button = styled.button`
    margin: 0 auto;
    background-color: #22D9E3;
    border: 2px solid white;
    color: black;
    padding: 2px 16px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 20px;
    height: 40px;
`