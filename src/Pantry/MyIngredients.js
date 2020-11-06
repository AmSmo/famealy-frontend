import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import IngredientShow from './card/IngredientShow'
import SuppliedShow from './card/SuppliedShow'
import IngredientSearch from '../Search/IngredientSearch'
import styled from 'styled-components'
import ConvertForm from './form/ConvertForm'
import EditUserIngredient from './form/EditUserIngredient'
import {Radio, Pagination } from 'semantic-ui-react'
function MyIngredients(props){
    let [myIngredients, setMyIngredients] = useState([])
    let [sortedIngredients, setSortedIngredients] = useState([])
    let [sortedSupplied, setSortedSupplied] = useState([])
    let [mySuppliedIngredients, setMySuppliedIngredients] = useState([])
    let [toEdit, setToEdit] = useState(null)
    let [mine, setMine] = useState(false)
    let [toSort, setToSort] = useState(myIngredients)
    let [max, setMax] = useState(0)
    let [list, setList] = useState(0)
    useEffect(() => {
        setMyIngredients(props.myIngredients)
        setMySuppliedIngredients(props.mySuppliedIngredients)
    });
    
    useEffect (() => {
        setSortedIngredients(myIngredients)
        setSortedSupplied(mySuppliedIngredients)
        setMax(myIngredients.length)
        renderMyIngredients()}, [myIngredients])

    const renderMyIngredients = () => {
        if (props.myIngredients.length > 0){
        return sortedIngredients.slice(list*10, list*10+10).map(ingredient => {
        return <IngredientShow ingredient={ingredient} sendToEdit={sendToEdit}/>})
        }
    }   
    const renderSuppliedIngredients = () => {
        if (props.mySuppliedIngredients.length > 0){
        return sortedSupplied.map(ingredient => {
        return <SuppliedShow ingredient={ingredient} sendToEdit={editSupplied}/>})
        }
    }   

    const sendToEdit = (ingredient) => {
        setToEdit(ingredient)
        
    }

    const editSupplied = (ingredient) => {
        
        ingredient["ingredient"] = {name : ingredient.ingredient_name, spoon_id: ingredient.ingredient_id, possible_units: ingredient.possible_units}
        setToEdit(ingredient)
    }
    const changeMine = (e, result) =>{
        if(!result.checked){
            setMax(sortedIngredients.length)
        }else{
            setMax(sortedSupplied.length)
        }
        setMine(result.checked)
        
    }

    useEffect(()=>{
        if (!mine) {
            setMax(sortedIngredients.length)
        } else {
            setMax(sortedSupplied.length)
        }
    }, [sortedIngredients, sortedSupplied])

    const sortIngredients = (value) => {
        
        
        setSortedIngredients(myIngredients.filter(ing => ing.ingredient.name.toLowerCase().includes(value.toLowerCase())))
        
        setSortedSupplied(mySuppliedIngredients.filter(ing => ing.ingredient_name.toLowerCase().includes(value.toLowerCase())))
        
        
    }
    

    return(
        
        <>
        <LeftCorner>
            <IngredientSearch addPantry={props.addPantry} myIngredients={myIngredients} sortIngredients={sortIngredients} />
        </LeftCorner>

        <RightCorner>

                <ConvertForm convertIngredient={props.convertIngredient} toEdit={toEdit} />
                {toEdit ?

                    <EditUserIngredient userIngredient={toEdit} editIngredient={props.editIngredient}/> :
                    null}
        </RightCorner>
            <Pagination onPageChange={(event, data) => setList(data.activePage - 1)} defaultActivePage={1} totalPages={Math.ceil(max / 10)} />
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