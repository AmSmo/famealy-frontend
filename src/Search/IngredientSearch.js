import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class RecipeSearch extends Component {
    state = {
        recipes: []
    }

    componentDidMount = () => {
        
        fetch(`http://localhost:3001/ingredient_search/${this.props.match.params.ingredient}`)
            .then(response => response.json())
            .then(recipes => this.setState({ recipes: recipes }))
    }

    render() {
        return (
            <>
                LASLFLAFLASLFSALFLA
                { this.props.match.keyword === null ?
                    <div>Search Form Here</div>
                    :
                    <div>Search Results Here</div>
                }
            </>
        )
    }
}

export default withRouter(RecipeSearch)