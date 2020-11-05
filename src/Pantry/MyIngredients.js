import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import IngredientShow from './card/IngredientShow'
import SuppliedShow from './card/SuppliedShow'
import IngredientSearch from '../Search/IngredientSearch'
import styled from 'styled-components'
import ConvertForm from './form/ConvertForm'
import EditUserIngredient from './form/EditUserIngredient'
import {Radio } from 'semantic-ui-react'
function MyIngredients(props){
    const [myIngredients, setMyIngredients] = useState([])
    const [mySuppliedIngredients, setMySuppliedIngredients] = useState([])
    const [toEdit, setToEdit] = useState(null)
    const [mine, setMine] = useState(false)
    useEffect(() => {
        setMyIngredients(props.myIngredients)
        setMySuppliedIngredients(props.mySuppliedIngredients)
    });

    const renderMyIngredients = () => {
        if (props.myIngredients.length > 0){
        return myIngredients.map(ingredient => {
        return <IngredientShow ingredient={ingredient} sendToEdit={sendToEdit}/>})
        }
    }   
    const renderSuppliedIngredients = () => {
        if (props.mySuppliedIngredients.length > 0){
        return mySuppliedIngredients.map(ingredient => {
        return <SuppliedShow ingredient={ingredient} sendToEdit={editSupplied}/>})
        }
    }   

    const sendToEdit = (ingredient) => {
        console.log(ingredient)
        setToEdit(ingredient)
        
    }

    const editSupplied = (ingredient) => {
        
        ingredient["ingredient"] = {name : ingredient.ingredient_name, spoon_id: ingredient.ingredient_id, possible_units: ingredient.possible_units}
        setToEdit(ingredient)
    }
    const changeMine = (e, result) =>{
        setMine(result.checked)
        
    }

    

    return(
        
        <>
        <LeftCorner>
            <IngredientSearch addPantry={props.addPantry} myIngredients={myIngredients} />
        </LeftCorner>

        <RightCorner>

                <ConvertForm convertIngredient={props.convertIngredient} toEdit={toEdit} />
                {toEdit ?

                    <EditUserIngredient userIngredient={toEdit} editIngredient={props.editIngredient}/> :
                    null}
        </RightCorner>
            
                    <h3>Personal Pantry
                
                    <Radio slider onChange={changeMine} />
                
                    Potluck Pantry</h3>
       
            <Middle>
        {!mine? 
        <>
        {renderMyIngredients()}
        </>
            :
            <>
                {renderSuppliedIngredients()}
            </>}
            </Middle>
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


const Middle = styled.div`
padding: 0 50px;
margin: 0 auto;
maxWidth: 80vw;
display: flexbox;
flex-wrap: wrap
`

const RightCorner = styled.div`
display: block;
width: 220px;
float: Right;
height: 80vh;
padding-top: 40px;

margin: 0px auto;
margin-right: 30px;
`