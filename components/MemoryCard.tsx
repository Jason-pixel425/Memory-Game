import React from 'react'
import { decodeEntity } from 'html-entities'
import { EmojisData, SelectedCards } from './emojisData.ts'
import EmojiButton from "./EmojiButton.tsx"

interface Props {
    handleClick: (emojiName:string, index: number) => void
    emojisData: EmojisData[]
    selectedCards: SelectedCards[]
    matchedCards: SelectedCards[]
}

export default function MemoryCard({ handleClick, selectedCards, matchedCards, emojisData }: Props) {

    // Array of emojis that will act as the card images to match
    const emojiArray: string[] = ['🐶', '🐷', '🐙', '🐛', '🐵', '🐶', '🐷', '🐙', '🐛', '🐵']
    
    // Array of button elements that will act as the cards to match
    const cardEl = emojisData.map((emoji: EmojisData, index: number) => {
        const selectedCardEntry: boolean = selectedCards.some(card => card.index === index)
        const matchedCardEntry: boolean = matchedCards.some(card => card.index === index)
       return ( <li key={index} className="card-item">
            <EmojiButton
                className="btn btn--emoji"
                handleClick={handleClick}
                emojiName={emoji.name}
                index={index}
                content={decodeEntity(emoji.htmlCode[0])}
                selectedCardEntry={selectedCardEntry}
                matchedCardEntry={matchedCardEntry}
            />
        </li>
        )
        }
    )
    
    return <ul className="card-container">{cardEl}</ul>
}