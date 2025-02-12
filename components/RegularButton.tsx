import React from 'react'
export default function RegularButton({ children, handleClick }) {
    // Returns a re-usable button
    return (
        <button
            className="btn btn--text"
            onClick={handleClick}
        >
            {children}
        </button>
    )
}