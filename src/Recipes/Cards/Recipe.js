import {withRouter} from 'react-router-dom'
import React, { Component } from 'react'
class Recipe extends Compontent{
    state = {
        recipe: {}
    }
    componentDidMount = () => {
        fetch(`http://localhost:3001/recipes/spoon/${this.props.match.param.spoon_id}`)
        .then(resp=> resp.json())
        .then(data => this.setState({recipe: data}))
    }
    render(){
    return(
        <div>Recipe</div>
    )}
}

export default Recipe