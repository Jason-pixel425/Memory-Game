import React from 'react'

interface Props {
    children?: React.ReactNode
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
    isBool?: boolean 
}

export default function RegularButton({ children, isBool, handleClick }: Props) {
    // Returns a re-usable button
    return (
        <button
            className="btn btn--text"
            onClick={handleClick}
            disabled={isBool || false}
        >
            {children}
        </button>
    )
}