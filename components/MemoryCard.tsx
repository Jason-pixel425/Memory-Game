import React from 'react'
import { decodeEntity } from 'html-entities'
import { EmojisData } from './emojisData.ts'

interface Props {
    handleClick: () => void
    emojisData: EmojisData[]
}

export default function MemoryCard({ handleClick, emojisData }: Props) {

    // Array of emojis that will act as the card images to match
    const emojiArray: string[] = ['🐶', '🐷', '🐙', '🐛', '🐵', '🐶', '🐷', '🐙', '🐛', '🐵']
    
    // Array of button elements that will act as the cards to match
    const emojiEl = emojisData.map((emoji: EmojisData, index: number) =>
        <li key={index} className="card-item">
            <button
                className="btn btn--emoji"
                onClick={handleClick}
            >
                {decodeEntity(emoji.htmlCode[0])}
            </button>
        </li>
    )
    
    return <ul className="card-container">{emojiEl}</ul>
}