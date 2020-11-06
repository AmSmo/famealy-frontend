import React, { useState, useEffect } from 'react'
import { Dropdown, Segment, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import IndieAdd from './IndieAdd'
function BulkAdd(props) {
    

    let sortedIngredients = props.ingredients.filter(ingredient => !props.myIngredients.some(mine => {
        return (ingredient.spoon_id  === mine.ingredient.spoon_id)}
        ))
    
    const renderForm = (ingredients) => {
        return ingredients.map(ingredient => {
            return <IndieAdd addList={props.addList} ingredient={ingredient} />
        })
    }
    
    return (<form onSubmit={props.addBulk} >
        <Segment >
            <Grid columns={2} relaxed='very'>
                <Grid.Column>
                    {renderForm(sortedIngredients.slice(0,10))}
                </Grid.Column>
                <Grid.Column>
                    {renderForm(sortedIngredients.slice(10,20))}
                </Grid.Column>
            </Grid>
            </Segment>
            <Button> Submit </Button>
    </form>
    )
}

export default BulkAdd

const Button = styled.button`
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
    border-radius: 20px;
    
`