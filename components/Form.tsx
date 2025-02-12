import React from 'react'
import RegularButton from './RegularButton'

interface Props {
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    isLoading: boolean
}

export default function Form({ handleSubmit, isLoading }: Props) {
    //Returns a form with a button to start the game ()
    return (
        <form className="wrapper">
            <RegularButton isLoading={isLoading} handleClick={handleSubmit}>
                Start Game
            </RegularButton>
        </form>
    )
}