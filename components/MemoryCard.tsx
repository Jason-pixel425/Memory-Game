import React from 'react'
import { decodeEntity } from 'html-entities'
import { EmojisData } from './emojisData.ts'
import EmojiButton from "./EmojiButton.tsx"

interface Props {
    handleClick: (emojiName:string, index: number) => void
    emojisData: EmojisData[]
}

export default function MemoryCard({ handleClick, emojisData }: Props) {

    // Array of emojis that will act as the card images to match
    const emojiArray: string[] = ['🐶', '🐷', '🐙', '🐛', '🐵', '🐶', '🐷', '🐙', '🐛', '🐵']
    
    // Array of button elements that will act as the cards to match
    const cardEl = emojisData.map((emoji: EmojisData, index: number) =>
        <li key={index} className="card-item">
            <EmojiButton
                className="btn btn--emoji"
                handleClick={handleClick}
                emojiName={emoji.name}
                index={index}
            >
                {decodeEntity(emoji.htmlCode[0])}
            </EmojiButton>
        </li>
    )
    
    return <ul className="card-container">{cardEl}</ul>
}