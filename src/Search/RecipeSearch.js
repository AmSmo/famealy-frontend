import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RecipeCard from './Cards/RecipeCard.js'
import styled from 'styled-components'
import { Pagination } from 'semantic-ui-react'

class RecipeSearch extends Component {
    state = {
        recipes: [],
        list: 0,
        max: 1,
        searched: false
    }

    renderRecipes(){
        return this.state.recipes.slice(this.state.list * 9, (this.state.list * 9 + 9)).map(recipe => <RecipeCard recipe={recipe }/ >)
    }

    componentDidUpdate = (prevProps, prevState) => {
        let keyword = this.props.match.params.recipeTitle
        if (prevProps.match.params.recipeTitle !== keyword) {
            let token = localStorage.getItem("token")
            fetch(`http://localhost:3001/recipe_search/${keyword}`, {
                headers:
                    { Authorization: `Bearer ${token}` }
            })

                .then(resp => {

                    return resp.json()
                })
                .then(recipes => {
                    if (recipes.errors) {
                        return this.setState({ api: [] })
                    } else {return this.setState({
                            recipes: recipes,
                            list: 0,
                            max: recipes.length
                    })}
                })
                .catch(console.log)
        }
    }

    
    componentDidMount = () => {
        let token= localStorage.getItem("token")
        fetch(`http://localhost:3001/recipe_search/${this.props.match.params.recipeTitle}`, { headers: { Authorization: `Bearer ${token}`}})
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
                            <Pagination onPageChange={(event, data) => this.setState({list: (data.activePage-1)})} defaultActivePage={1} totalPages={Math.ceil(this.state.max/10) } />
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