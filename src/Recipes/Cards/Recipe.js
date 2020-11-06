import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid, Segment, Dropdown, Button } from 'semantic-ui-react'
class Recipe extends Component {
    state = {
        recipe: {
            name: "",
            directions_json: [],
            image_url: "",
            recipe_ingredients: [],
            spoon_id: 0
        },
        bringing: false,
        potluck: 0
    }

    makingIt = (e) => {

        let token = localStorage.getItem("token")
        let configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ bringing: { potluck_id: this.state.potluck, recipe: this.state.recipe.spoon_id } })
        }
        fetch("http://localhost:3001/potlucks/bring_food", configObj)
            .then(resp => resp.json())
            .then(data => this.props.history.push(`/potlucks/users/${data.id}`))
    }

    openForm = () => {
        this.setState(prevState => { return { bringing: !prevState.bringing } })

    }

    options = () => {
        return this.props.info.potlucks.map(potluck => {
            return {
                key: potluck.id,
                text: potluck.name,
                value: potluck.id
            }
        })
    }

    onChange = (e, result) => {
        this.setState({ potluck: result.value })

    }
    ingredientList = () => {

        return this.state.recipe.recipe_ingredients.map(ingredient => {
            return <div>{ingredient.description}</div>
        })
    }


    directions = () => {

        return this.state.recipe.directions_json.map(direction => {
            return <div>{direction.step}.  {direction.details}</div>
        })
    }

    componentDidMount = () => {
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/recipes/spoon/${this.props.match.params.spoon_id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {

                this.setState({ recipe: { ...data } })
            })
    }

    componentDidUpdate = (prevProps, prevState) => {
        return this.state.recipe !== prevState.recipe
    }
    render() {
        console.log("rec",this.props.info.ingredients)
        return (
            <>
                {this.state.recipe.name !== "" ?
                    <>
                        <h2>{this.state.recipe.name}</h2>
                        <TopCard>
                            <Photo src={this.state.recipe.image_url} />
                            <Description>
                                {this.state.recipe.description}
                            </Description>
                            <RightCorner>
                                {this.props.info !== undefined ?
                                    <>
                                    {
                                        this.props.info.recipes.find(myrecipe => myrecipe.spoon_id === this.state.recipe.spoon_id) ?

                                            <RecipeButton onClick={() => this.props.deleteHandler(this.state.recipe.spoon_id)}>Delete </RecipeButton>
                                            :
                                            <>
                                                <RecipeButton onClick={() => this.props.addHandler(this.state.recipe.spoon_id)} >Save to my Recipes</RecipeButton>
                                            </>
                                    }
                                
                                {this.props.info.potlucks.length > 0 ?

                                    <>
                                        <RecipeButton onClick={this.openForm}>Make for a Potluck</RecipeButton><br></br>
                                    </>
                                    :
                                    null}
                                </>
                            :
                            null
                        }
                            {this.state.bringing ?
                                    <>
                                        <form>

                                            <Dropdown
                                                selection
                                                name="potluck"
                                                options={this.options()}
                                                onChange={this.onChange}
                                                
                                                placeholder="Choose Potluck"
                                            />
                                        </form>
                                        <Button onClick={this.makingIt}>Bring It!</Button>
                                    </>
                                    :
                                    null}
                            </RightCorner>
                        </TopCard>


                        <Segment style={{ margin: "0 10px" }} >
                            <Grid columns={2} relaxed='very'>
                                <Grid.Column >
                                    <h2>Ingredients</h2>
                                    <ul style={{ background: "white", padding: "20px", listStyle: "none", textAlign: "left", marginLeft: "30px" }}>
                                        {this.ingredientList()}
                                    </ul>
                                </Grid.Column>

                                <Grid.Column>
                                    <h2>Directions</h2>
                                    <ul style={{ background: "white", padding: "20px", listStyle: "none", textAlign: "left", marginLeft: "30px" }}>
                                        {this.directions()}
                                    </ul>


                                </Grid.Column>
                            </Grid>
                        </Segment>






                    </>
                    :
                    null}

            </>
        )
    }
}

export default withRouter(Recipe)
const RecipeButton = styled.button`
    margin: 0 auto;
    background-color: #22D9E3;
    border: 2px solid white;
    color: black;
    width: 180px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 20px;`


const Description = styled.div`
    width: 400px;
    border: 1px solid whitesmoke;
    margin: 20px 20px;

`

const Photo = styled.img`
    max-width: 450px;
    margin: 0 20px;
`
const TopCard = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    width: auto;
    margin: 10px auto;
    justify-content: space-evenly;`

const RightCorner = styled.div`
float:right;
display:block;
margin: 60px auto;
padding-left: 30px;
width: 220px;   
`
