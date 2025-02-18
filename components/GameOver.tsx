import React from 'react'
import RegularButton from './RegularButton.tsx'

interface Props {
    resetGame: () => void
}

export default function GameOver({resetGame}: Props) {
    return (
        <div className="wrapper wrapper--accent">
            <p className="p--large">You've matched all the memory cards!</p>
            <RegularButton handleClick={resetGame}>Play again?</RegularButton>
        </div>
    )
}