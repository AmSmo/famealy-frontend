import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RecipeCard from './Cards/RecipeCard.js'
import styled from 'styled-components'
import { Pagination } from 'semantic-ui-react'

class RecipeSearch extends Component {
    state = {
        recipes: [],
        list: 0,
        max: 1
    }

    renderRecipes(){
        return this.state.recipes.slice(this.state.list, (this.state.list + 9)).map(recipe => <RecipeCard recipe={recipe }/ >)
    }

    componentDidUpdate = (prevProps) => {
        return this.props.match.params.recipeTitle !== prevProps.match.params.recipeTitle
    }
    
    componentDidMount = () => {
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
                            <Pagination onPageChange={(event, data) => this.setState({list: data.activePage})} defaultActivePage={9} totalPages={Math.ceil(this.state.max/10) } />
                        <SearchContainer>
                            {this.renderRecipes()}
                        </SearchContainer>
                    </>
                        :
                        <div>No Results</div>
                }
            </>
        )
    }
}

export default withRouter(RecipeSearch)

const SearchContainer = styled.div`
    display: flex;
    margin: 80px;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;
`