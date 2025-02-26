import React, { useRef, useEffect } from 'react'

import RegularButton from './RegularButton.tsx'

interface Props {
    resetGame: () => void
}

export default function GameOver({resetGame}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        divRef.current?.focus()
    }, [])

    return (
        <div ref={divRef} className="wrapper wrapper--accent" tabIndex={-1}>
            <p className="p--large">You've matched all the memory cards!</p>
            <RegularButton handleClick={resetGame}>Play again?</RegularButton>
        </div>
    )
}