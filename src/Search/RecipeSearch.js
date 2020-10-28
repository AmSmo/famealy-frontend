import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RecipeCard from './Cards/RecipeCard.js'

class RecipeSearch extends Component {
    state = {
        recipes: [],
        list: 0,
        max: 1
    }

    renderRecipes(){
        return this.state.recipes.map(recipe => <RecipeCard recipe={recipe }/ >)
    }
    componentDidMount = () => {
        console.log("potatos", this.props.match.params.recipeTitle)
        fetch(`http://localhost:3001/recipe_search/${this.props.match.params.recipeTitle}`)
            .then(response => response.json())
            .then(recipes => this.setState({
                recipes: recipes,
                list: 0,
                max: recipes.length
            })
            )
    }

    renderRecipes
    render() {
        return (
            <>
                { this.props.match.keyword === null ?
                    <div>Search Form Here</div>
                    :
                    this.state.recipes.length > 0 ?
                    <>
                        <h1>Recipes</h1>
                        <ul>
                            {this.renderRecipes()}
                        </ul>
                    </>
                        :
                        <div>No Results</div>
                }
            </>
        )
    }
}

export default withRouter(RecipeSearch)