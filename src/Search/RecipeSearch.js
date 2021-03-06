import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RecipeCard from './Cards/RecipeCard.js'
import styled from 'styled-components'
import { Pagination } from 'semantic-ui-react'
import PhotoPlaceHolder from '../PlaceHolders/PhotoPlaceHolder.js'

class RecipeSearch extends Component {
    state = {
        recipes: [],
        sorted: [],
        list: 0,
        max: 1,
        searched: false,
        sortValue: "",
        loaded: false
    }

    renderRecipes(){
        return this.state.sorted.slice(this.state.list * 9, (this.state.list * 9 + 9)).map(recipe => <RecipeCard recipe={recipe }/ >)
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
                            sorted: recipes,
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
                sorted: recipes,
                list: 0,
                max: recipes.length,
                loaded: true
            })
            )
    }
    
    sortChange = (e) => {
        this.setState({[e.target.name]: e.target.value, list: 0})
        let sorted = this.state.recipes.filter(recipe => recipe.title.toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState({ sorted: sorted, max: sorted.length })
    }
    
    render() {
        
        return (
            <Background>
                {this.state.loaded  ?
                <>
                { this.props.match.keyword === null ?
                    <div>Search Form Here</div>
                    :
                    this.state.recipes.length > 0 ?
                    <>
                    
                        <h1>Recipes</h1>
                          {this.state.max > 10 ?  <Pagination onPageChange={(event, data) => this.setState({list: (data.activePage-1)})} defaultActivePage={1} totalPages={Math.ceil(this.state.max/10) } /> : null}
                        <br></br>
                        <input style={{margin: "10px"}} type="text" value={this.state.sortValue} placeholder="Filter Further" name="sortValue" onChange={this.sortChange}/>
                        <SearchContainer>
                            {this.renderRecipes()}
                        </SearchContainer>
                    </>
                        :
                        <div>No Results</div>
                }
                </>
                :
                <PhotoPlaceHolder />
            }
            </Background>
        )
    }
}

export default withRouter(RecipeSearch)

const SearchContainer = styled.div`
    display: flex;
    margin: 5px 50px;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;


`

const Background = styled.div`
padding-top: 10px;
{/* background: url("/assets/tablefull2.png"); */}
position: absolute;
height: 93vh;
width: 100vw;
background-size: cover;
background-repeat: no-repeat;
text-align: center;
margin: 0 auto;
display:table;  
`