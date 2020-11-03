import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import IngredientShow from './card/IngredientShow'
import IngredientSearch from '../Search/IngredientSearch'
import { Grid, Divider, Segment, Image } from 'semantic-ui-react'
import ConvertForm from './card/ConvertForm'
function MyIngredients(props){
    const [myIngredients, setMyIngredients] = useState("")
    
    useEffect(() => {
        setMyIngredients(props.myIngredients)
    });

    const renderMyIngredients = () => {
        if (props.myIngredients.length > 0){
        return myIngredients.map(ingredient => {
        return <IngredientShow ingredient={ingredient} />})
        }
    }   
    return(
        
        <>
            <Segment inverted>
                <Grid column={2} style={{margin:"auto", justifyContent: "center"}} >
                    <Grid.Column style={{ display: "block", width: "30vw" }}>
                        <IngredientSearch addPantry={props.addPantry} myIngredients={myIngredients} />
                    </Grid.Column>
                    <Grid.Column style={{ display: "block", width: "30vw"  }}>
                        <ConvertForm />
                    </Grid.Column>
                    <Grid.Column style={{ display: "block", width: "30vw"  }}>
                        EDIT FORM   
                    </Grid.Column>
                </Grid>
                <Divider inverted />

    
            
        <div>INGREDIENTS</div>
        
        {renderMyIngredients()}
                <Divider horizontal inverted>
    
    </Divider>
            </Segment>
        </>
    )
}

export default withRouter(MyIngredients)