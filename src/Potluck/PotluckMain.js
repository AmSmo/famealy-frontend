import React, { useEffect, useState } from 'react'
import PotluckCard from './card/PotluckCard'
import {withRouter }from 'react-router-dom'
import PotluckForm from './form/PotluckForm'
import {Header, Radio} from 'semantic-ui-react'
import styled from 'styled-components'
function PotluckMain(props) {
    let [myPotlucks, setMyPotlucks] = useState([])
    let [friendPotlucks, setFriendPotlucks] = useState([])
    let [viewPotluck, setViewPotluck] = useState(false)
    const changeView = (e, result) => {
        
        setViewPotluck(result.checked)
    }

    const createPotluck = (e) =>{
        let token = localStorage.getItem("token")
        let {name, location, date} = e.target
        
        let configObj={
            method: "POST",
            headers: {"content-type": "application/json",
                    "accepts": "application/json",
                Authorization: `Bearer ${token}`},
                body: JSON.stringify({potluck: {name: name.value, date: date.value, location: location.value}})
        }
        fetch("http://localhost:3001/potlucks", configObj)
        .then(resp=> resp.json())
            .then(data => {

                setMyPotlucks(data.my_potlucks)
                setFriendPotlucks(data.friends_potlucks)
    })
    }
    const renderMyPotlucks = () => {
        return myPotlucks.map(currentPotluck => <PotluckCard potluck={currentPotluck} />)
    }


    const renderFriendsPotlucks = () => {
        return friendPotlucks.map(potluck => <PotluckCard potluck={potluck} join={true}/>)
    }


    async function fetchPotlucks() {
        let token = localStorage.getItem("token")
        await fetch("http://localhost:3001/potlucks", { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                
               setMyPotlucks(data.my_potlucks)
               setFriendPotlucks(data.friends_potlucks)
            }
            )
    }


    useEffect(() => {
        fetchPotlucks()
    }, [])
    
    return (
        <>
        <LeftCorner>
            <h2>Create a Potluck</h2>
            <PotluckForm createPotluck={createPotluck} />
        </LeftCorner>

            <Middle>
                    <Choice>My Potlucks
                
                    <Radio slider onChange={changeView} />
                
                   Friends Potlucks</Choice>
                
            { !viewPotluck ?
                <>
            {myPotlucks.length > 0 ?
                <PotluckDiv>
                    
                    {renderMyPotlucks()}
                </PotluckDiv>
                :<h4>You aren't a part of any Potlucks.  You should Create or Join one.</h4>
            }
                </>
             :   
             <>
            {friendPotlucks.length > 0 ?
            <>
                <PotluckDiv>
                    {renderFriendsPotlucks()}
                                </PotluckDiv>
            </>
                : <h4>No Potlucks to see here</h4>
            }
            </>
            
        }
            
            </Middle>
        </>
    )
}

export default withRouter(PotluckMain)

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
    margin: 0 220px 0 220px;
    maxWidth: 80vw;
    display: flow-root;
    flex-wrap: wrap;
    text-align: center;
`

const Choice = styled.h3`
    margin: 0 auto;
    display: block;
`

const PotluckDiv = styled.div`
    display: flexbox;
    justify-content: space-around
`