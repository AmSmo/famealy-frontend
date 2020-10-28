import {withRouter} from 'react-router-dom'
import React, { Component } from 'react'

class Recipe extends Component{
    state = {
        recipe: {}
    }
    componentDidMount = () => {
        fetch(`http://localhost:3001/recipes/spoon/${this.props.match.params.spoon_id}`)
        .then(resp=> resp.json())
        .then(data => {
            console.log(data)
            this.setState({recipe: data})})
    }
    render(){
    return(
        <div>Recipe things</div>
    )}
}

export default withRouter(Recipe)