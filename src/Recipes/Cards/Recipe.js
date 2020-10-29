import {withRouter} from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'
class Recipe extends Component{
    state = {
        recipe: {
            name: "",
            directions_json: [],
            image_url: "",
            recipe_ingredients: []
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
        
        fetch(`http://localhost:3001/recipes/spoon/${this.props.match.params.spoon_id}`)
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
            <ul>
                {this.ingredientList()}
            </ul>
            <ul>
                {this.directions()}
            </ul>
            </>
            : 
            null }
        </>
    )}
}

export default withRouter(Recipe)

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