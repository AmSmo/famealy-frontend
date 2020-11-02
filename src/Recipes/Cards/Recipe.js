import {withRouter} from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
class Recipe extends Component{
    state = {
        recipe: {
            name: "",
            directions_json: [],
            image_url: "",
            recipe_ingredients: [],
            spoon_id: 0
    }}

    ingredientList = () => {
        
        return this.state.recipe.recipe_ingredients.map(ingredient => {
            return <Ingredient>{ingredient.description}</Ingredient>
        })
    }

    directions = () => {
        
        return this.state.recipe.directions_json.map(direction => {
            return <Direction>{direction.step}.  {direction.details}</Direction>
        })
    }

    componentDidMount = () => {
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/recipes/spoon/${this.props.match.params.spoon_id}`, { headers: { Authorization: `Bearer ${ token }`}})
        .then(resp=> resp.json())
        .then(data => {
            
            this.setState({recipe: {...data}})})
    }

    componentDidUpdate = (prevProps, prevState)=> {
        return this.state.recipe != prevState.recipe
    }
    render(){
        
    return(
        <>
            {this.state.recipe.name !== "" ? 
            <>
            <h2>{this.state.recipe.name}</h2>
            <TopCard>
                <Photo src={this.state.recipe.image_url}/>
                <Description>
                    {this.state.recipe.description}
                </Description>
            </TopCard>


                    <Segment style={{ margin: "0 10px" }} inverted>
                        <Grid columns={2} relaxed='very'>
                            <Grid.Column >
                                <ul style={{ background: "white", padding: "20px", listStyle:"none", textAlign: "left", marginLeft: "30px"}}>
                                    {this.ingredientList()}
                                </ul>
                            </Grid.Column>
                        
                            <Grid.Column>
                                <ul style={{ background: "white", padding: "20px", listStyle: "none", textAlign: "left", marginLeft: "30px" }}>
                                    {this.directions()}
                                </ul>

                        
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    {this.props.info !== undefined ?
                    <>
                    
                    { this.props.info.recipes.find(myrecipe => myrecipe.spoon_id === this.state.recipe.spoon_id) ? 
                        
                                <RecipeButton onClick={() => this.props.deleteHandler(this.state.recipe.spoon_id)}>Delete </RecipeButton> 
                        : 
                        <>
                            <RecipeButton onClick={() => this.props.addHandler(this.state.recipe.spoon_id)} >Save to my Recipes</RecipeButton>
                        </>
                        }
                        <RecipeButton>Make for a Potluck</RecipeButton>
                        </>
            : 
            null
                    }
                    </>
            :
            null }
    </> 
    )}
}

export default withRouter(Recipe)
const RecipeButton = styled.button`
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
    border-radius: 20px;`


const Description = styled.div`
    width: 400px;
    border: 1px black solid;
    margin: 20px 20px;

`
const Ingredient=styled.li`
    color: red;
`
const Direction=styled.li`
    color: blue;
`
const Photo = styled.img`
    max-width: 450px;
    margin: 0 20px;
`
const TopCard= styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    width: auto;
    margin: 10px auto;
    justify-content: space-evenly;`