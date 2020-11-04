import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import IngredientShow from './card/IngredientShow'
import IngredientSearch from '../Search/IngredientSearch'
import { Grid, Divider, Segment} from 'semantic-ui-react'
import styled from 'styled-components'
import ConvertForm from './form/ConvertForm'
import EditUserIngredient from './form/EditUserIngredient'
function MyIngredients(props){
    const [myIngredients, setMyIngredients] = useState("")
    const [toEdit, setToEdit] = useState(null)
    
    useEffect(() => {
        setMyIngredients(props.myIngredients)
    });

    const renderMyIngredients = () => {
        if (props.myIngredients.length > 0){
        return myIngredients.map(ingredient => {
        return <IngredientShow ingredient={ingredient} sendToEdit={sendToEdit}/>})
        }
    }   

    const sendToEdit = (ingredient) => {
        setToEdit(ingredient)
        
    }

    return(
        
        <>
            <Segment >
                <Grid column={2} style={{margin:"auto", justifyContent: "center"}} >
                    <Grid.Column style={{ display: "block", width: "30vw" }}>
                        <IngredientSearch addPantry={props.addPantry} myIngredients={myIngredients} />
                    </Grid.Column>
                    <Grid.Column style={{ display: "block", width: "30vw"  }}>
                        <ConvertForm convertIngredient={props.convertIngredient} toEdit={toEdit}/>
                    </Grid.Column>
                    <Grid.Column style={{ display: "block", width: "30vw"  }}>
                        {toEdit  ?
                        
    <EditUserIngredient userIngredient={toEdit} /> :
    null}
                    </Grid.Column>
                </Grid>
                

    
            
        <div>INGREDIENTS</div>
        
        {renderMyIngredients()}
    
            </Segment>
        </>
    )
}

export default withRouter(MyIngredients)

const LeftCorner = styled.div`
display: block;
width: 220px;
float: left;
height: 80vh;
padding-top: 40px;
padding-left: 30px;
margin: 0px auto;

`