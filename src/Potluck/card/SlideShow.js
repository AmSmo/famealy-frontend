import React, {useState, useEffect} from 'react';



const Slideshow = (props) => {
   
    let [slideCount, setSlideCount] = useState(0)

    let getRandomInt = () => {
        return Math.floor(Math.random() * Math.floor(props.images.length));
    }

    useEffect(()=> {
       const slides = setInterval(() => {setSlideCount(getRandomInt)}, 3500)
    return () => clearInterval(slides)
    })

    

    const slide = (recipe) => { return (
            <>
            <img src={recipe.recipe.image_url} style={{ width: "auto", height: "150px", borderRadius: "30px" }}/>
                <div>{recipe.recipe.name}</div>
            </>)
        }
        
  
    

    return (<>
        {props.images && props.images.length > 0 ?
        <div>
                
                    <div style={{height: "220px"}}>
                    {props.images[slideCount]?
                        
                        slide(props.images[slideCount])
                    :
                    null}
                    </div>
                    
                
                
        </div>
    : null}
    </>
    )
};

export default Slideshow;