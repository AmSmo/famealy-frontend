import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import IngredientShow from './card/IngredientShow'
import SuppliedShow from './card/SuppliedShow'
import IngredientSearch from '../Search/IngredientSearch'
import styled from 'styled-components'
import ConvertForm from './form/ConvertForm'
import EditUserIngredient from './form/EditUserIngredient'
import BulkAdd from './form/BulkAdd'
import {Radio, Pagination, Popup } from 'semantic-ui-react'
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
    let [frequent, setFrequent] = useState([])
    let [toBulk, setToBulk] = useState([])
    useEffect(() => {
        setMyIngredients(props.myIngredients)
        setMySuppliedIngredients(props.mySuppliedIngredients)
     
    });
    useEffect(() => {
        getFrequent()
    },[]);
    
    const addBulk = (e) => {
        e.preventDefault()
        props.addBulk(toBulk)
    }
    const addList = (e) => {   
        
        if (toBulk.length > 0){
            
            let idx = (toBulk.findIndex(item => item.spoon_id === e.spoon_id))
                
                if (idx === -1){
                    setToBulk([...toBulk, e])
                }else{
                    let newArray = toBulk
                    
                    newArray[idx] = e
                    setToBulk(newArray)
        }
        }else{   
            setToBulk([e])
        }
    }

    const getFrequent = () => {
        let token = localStorage.getItem("token")
        fetch("http://localhost:3001/ingredients/frequent", {headers: {Authorization: `Bearer ${token}`}})
        .then(resp => resp.json())
        .then(data => setFrequent(data))
    }
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

                    <EditUserIngredient userIngredient={toEdit} editIngredient={props.editIngredient} deleteIngredient={props.deleteIngredient} /> :
                    null}
                
        </RightCorner>
            <Pagination onPageChange={(event, data) => setList(data.activePage - 1)} defaultActivePage={1} totalPages={Math.ceil(max / 10)} />
                    <h3>Personal Pantry
                
                    <Radio slider onChange={changeMine} />
                
                    Potluck Pantry</h3>
                    {!mine ?
            <Popup position='bottom center' trigger={<Button>Bulk Add Form</Button>} on='click'>
                <div style={{display: "flex", width:"500px", flexWrap: "wrap"}}>
                <BulkAdd ingredients={frequent} myIngredients={myIngredients} addBulk={addBulk} addList={addList}/>
                </div>
            </Popup> :
            null}
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
background: url("/assets/fork2.png");
background-repeat: no-repeat;
background-size: contain;
background-position-x: 80px;
// background-position-y: 20px;

`


const Middle = styled.div`
padding: 0 50px;
margin: 0 auto;
maxWidth: 80vw;
display: flexbox;
flex-wrap: wrap;

`

const RightCorner = styled.div`
display: block;
width: 220px;
float: Right;
height: 80vh;
padding-top: 40px;

margin: 0px auto;
margin-right: 30px;
background: url("/assets/knife2.png");
background-repeat: no-repeat;
background-size: contain;
background-position-x: 80px;
// background-position-y: 20px;
`


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