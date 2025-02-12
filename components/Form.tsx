import React from 'react'
import RegularButton from './RegularButton'

export default function Form({ handleSubmit }) {
    //Returns a form with a button to start the game ()
    return (
        <form className="wrapper">
            <RegularButton handleClick={handleSubmit}>
                Start Game
            </RegularButton>
        </form>
    )
}