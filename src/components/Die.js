import React from "react"

export default function Die(props){

    const dieNumber = Math.ceil(Math.random()*6)
    
    return (
        <div
            className={props.styler}
            onClick={props.holdDice}
            >
            {props.value}
        </div>
    )
}