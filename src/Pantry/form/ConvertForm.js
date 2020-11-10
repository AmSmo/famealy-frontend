import React, {useState, useEffect} from 'react'
import {Dropdown, Message} from 'semantic-ui-react'
import styled from 'styled-components'
function ConvertForm(props) {
    let [fromType, setFromType] = useState("oz")
    let [toType, setToType] = useState("oz")
    let [ingredient, setIngredient] = useState("")
    let [amount, setAmount] = useState(0)
    let [answer, setAnswer] = useState("")
    const allowedTypes = ["oz", "cup", "g", "tbsp", "tsp", "lb", "kg", "large", "medium", "small", "slice", "can", "clove"]
    
    let options = allowedTypes.map(type => {
        return {key: type, text:type, value: type}
    })
    
    useEffect (() => {
        if (props.toEdit){
        setIngredient(props.toEdit.ingredient.name)
        setAmount(props.toEdit.amount)
        setFromType(props.toEdit.amount_type)}
    }, [props.toEdit])

    const onChange = (e, result) => {
        setAnswer("")
        switch (result.name){
            case "toType":
                setToType(result.value)
                break;
            case "fromType":
                setFromType(result.value)
                break;
            default:
                break;
        }

    }

    const onTypeChange = (e) => {
        
        setAnswer("")
        switch (e.target.name){
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

    const convertIngredient = (e, result) => {
        e.preventDefault()
        
        let token = localStorage.getItem("token")
        let configObj = {
            method: "POST",
            headers: {
                "accepts": "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({convert: {amount, toType, fromType, ingredient}})
        }
        fetch("http://localhost:3001/ingredients/convert", configObj)
        .then(resp => resp.json())
        .then(data => setAnswer(data["answer"]))
    }
   
    return (
        <>
            <h3>Convert Measurements</h3>
            <form onSubmit={convertIngredient} style={{textAlign: "left"}}>
                <div style={{ margin: "3px auto", display: "block", textAlign:"center" }}>
                <input type="text" name="ingredient" value={ingredient} placeholder="Ingredient" required  onChange={onTypeChange}/><br></br>
                
                <input style={{ width: "60px" }} value={amount} type="number" min="0" name="amount" step="0.05" required onChange={onTypeChange}/>
                
                <Dropdown
                    value={fromType}
                    placeholder='From'
                    name="fromType"
                    options={options}
                    onChange={onChange}
                />
                </div>
                <div style={{display: "flex",justifyContent: "space-evenly"}}>
                    <span>Convert to</span>
               
                <Dropdown 
                    value={toType}
                    name="toType"
                    options={options}
                    onChange={onChange}
                    
                    />
                </div>
                
                
                <br></br>
                <Button>Calculate</Button>
            </form>
            {answer !== "" ?
            <Message>{answer.slice(0, answer.length-1)}s</Message>
            :
            null}
        </>
    )
}

export default ConvertForm

const Button = styled.button`
    margin: 0 auto;
    background-color: #22D9E3;
    border: 1px solid rgb(27, 19, 19);
    color: black;
    padding: 2px 16px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 20px;
    
`