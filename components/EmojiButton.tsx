import React from 'react'

interface Props {
    handleClick: (emoji: string, index: number) => void
    className: string
    emojiName: string
    index: number
    content: string
    selectedCardEntry: boolean
    matchedCardEntry: boolean
}

export default function EmojiButton({handleClick, className, content, emojiName, index, selectedCardEntry, matchedCardEntry }: Props) {
    const disabled: boolean = selectedCardEntry || matchedCardEntry ? true : false
    return (
        <button
            className={className}
            onClick={(e) => handleClick(emojiName, index)}
            disabled={disabled}
            
        >
            {selectedCardEntry || matchedCardEntry ? content : "?"}
        </button>
    )
}