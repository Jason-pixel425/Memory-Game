import React, { useRef, useEffect } from 'react'
import RegularButton from './RegularButton.tsx'

interface Props {
    handleClick: () => void
}


export default function ErrorCard({handleClick}: Props) {
    const divRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        divRef?.current?.focus()
    }, [])

    return (
        <div ref={divRef} className="wrapper wrapper--accent">
            <p className="p--large">Sorry, there was an error.</p>
            <p className="p--regular">Please come back later or click the button below to try restarting the game.</p>
            <RegularButton handleClick={handleClick}>Restart Game</RegularButton>
        </div>
    )
}