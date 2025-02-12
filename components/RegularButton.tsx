import React from 'react'

interface Props {
    children: React.ReactNode
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    isLoading: boolean 
}

export default function RegularButton({ children, isLoading, handleClick }: Props) {
    // Returns a re-usable button
    return (
        <button
            className="btn btn--text"
            onClick={handleClick}
            disabled={isLoading}
        >
            {children}
        </button>
    )
}