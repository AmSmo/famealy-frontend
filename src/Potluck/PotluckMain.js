import React, { useEffect, useState } from 'react'
import PotluckCard from './card/PotluckCard'
import {withRouter }from 'react-router-dom'
import PotluckForm from './form/PotluckForm'
import { Radio} from 'semantic-ui-react'
import styled from 'styled-components'
import PhotoPlaceHolder from '../PlaceHolders/PhotoPlaceHolder'
function PotluckMain(props) {
    let [myPotlucks, setMyPotlucks] = useState([])
    let [friendPotlucks, setFriendPotlucks] = useState([])
    let [viewPotluck, setViewPotluck] = useState(false)
    let [loaded, setLoaded] = useState(false)

    const changeView = (e, result) => {
        
        setViewPotluck(result.checked)
    }

    const createPotluck = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        let token = localStorage.getItem("token")
        let configObj={
            method: "POST",
            headers: {"accepts": "application/json",
                Authorization: `Bearer ${token}`},
                body: data
        }
        fetch("http://localhost:3001/potlucks", configObj)
        .then(resp=> resp.json())
            .then(answer => {

                setMyPotlucks(answer.my_potlucks)
                setFriendPotlucks(answer.friends_potlucks)
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
               setLoaded(true)
            }
            )
    }


    useEffect(() => {
        fetchPotlucks()
    }, [])
    
    return (
        <Background>
            <Middle>
                    <Choice>My Potlucks
                
                    <Radio slider onChange={changeView} />
                
                   Friends Potlucks</Choice>
            </Middle>
        <LeftCorner>
            <h2>Create a Potluck</h2>
            <PotluckForm createPotluck={createPotluck} />
        </LeftCorner>

              {loaded ?
              <>  
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
        </>
            :
            <PhotoPlaceHolder />
            }
            
        </Background>
    )
}

export default withRouter(PotluckMain)

const LeftCorner = styled.div`
display: block;
width: 220px;
float: left;
height: 80vh;
padding-top: 20px;
padding-left: 30px;
margin: 0px auto;

`

const Middle = styled.div`
    
    margin: 0 auto;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;
`

const Choice = styled.h3`
    margin: 0 auto;
    display: block;
`

const PotluckDiv = styled.div`
    display: flexbox;
    justify-content: space-around;
    flex-wrap: wrap;
`

const Background = styled.div`
padding-top: 10px;

background: url("/assets/farm-dinner.png");
display: inline-table;
height: 93.5vh;
width: 100vw;
background-size: cover;
background-repeat: no-repeat;
text-align: center;
margin: 0 auto;
position: static;
`