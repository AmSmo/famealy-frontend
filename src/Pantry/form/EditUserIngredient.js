import React, { useState, useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

function EditUserIngredient(props) {
    let [toType, setToType] = useState("oz")
    let [ingredient, setIngredient] = useState("")
    let [amount, setAmount] = useState(0)
    let [ingredientId, setIngredientId] = useState(0)
    let [uiId, setUiId] = useState(0)

    
    let options = props.userIngredient.ingredient.possible_units.map(type => {
        return { key: type, text: type, value: type }
    })

    const onChange = (e, result) => {
        switch (result.name) {
            case "toType":
                setToType(result.value)
                break;
            default:
                break;
        }

    }

    useEffect(()=>{
        setToType(props.userIngredient.amount_type)
        setIngredient(props.userIngredient.ingredient.name)
        setAmount(props.userIngredient.amount)
        setIngredientId(props.userIngredient.ingredient.id)
        setUiId(props.userIngredient.id)
    }, [props.userIngredient])

    const onTypeChange = (e) => {

        switch (e.target.name) {
            case "ingredient":
                setIngredient(e.target.value)
                break
            case "amount":
                setAmount(e.target.value)
                break
            default:
                break;
        }
    }

    const editUserIngredient = (e, result) => {
        e.preventDefault()
        console.log(uiId)
        let token = localStorage.getItem("token")
        let configObj = {
            method: "PATCH",
            headers: {
                "accepts": "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ update: { amount, amount_type: toType} })
        }
        
        fetch(`http://localhost:3001/user_ingredient/${uiId}`, configObj)
            .then(resp => resp.json())
            .then(data => props.editIngredient(data))
    }

    return (
        <>
            <h3>Edit My Pantry</h3>
            <form onSubmit={(e) => editUserIngredient(e)} style={{ textAlign: "left" }}>
                <div style={{ margin: "3px auto", display: "flex", justifyContent: "space-evenly" }}>
                    <div style={{textTransform: "capitalize", fontSize:"20px"}}>{ingredient}</div>
                    </div>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <input style={{ width: "60px" }} value={amount} type="number" name="amount" step="0.1" required onChange={onTypeChange} />

                    <Dropdown
                        
                        value={toType}
                        name="toType"
                        options={options}
                        onChange={onChange}
                        
                        />
                </div>


                <br></br>
               <Button>Update Pantry</Button>
            </form>
        </>
    )
}

export default EditUserIngredient

const Button = styled.button`
    margin: 5px auto;
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