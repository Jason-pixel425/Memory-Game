import React from 'react'
export default function MemoryCard({ handleClick }) {

    // Array of emojis that will act as the card images to match
    const emojiArray: string[] = ['🐶', '🐷', '🐙', '🐛', '🐵', '🐶', '🐷', '🐙', '🐛', '🐵']
    
    // Array of button elements that will act as the cards to match
    const emojiEl = emojiArray.map((emoji, index) =>
        <li key={index} className="card-item">
            <button
                className="btn btn--emoji"
                onClick={handleClick}
            >
                {emoji}
            </button>
        </li>
    )
    
    return <ul className="card-container">{emojiEl}</ul>
}