import React from 'react'

interface Props {
    handleClick: (emoji: string, index: number) => void
    emojiName: string
    index: number
    content: string
    selectedCardEntry: boolean
    matchedCardEntry: boolean
}

export default function EmojiButton({handleClick, content, emojiName, index, selectedCardEntry, matchedCardEntry }: Props) {
    const disabled: boolean = selectedCardEntry || matchedCardEntry ? true : false
    const btnStyle: string =  matchedCardEntry ? "btn--emoji__back--matched" : selectedCardEntry ? "btn--emoji__back--selected" : "btn--emoji__front"
    return (
        <button
            className={`btn btn--emoji ${btnStyle}`}
            onClick={(e) => handleClick(emojiName, index)}
            disabled={disabled}
            
        >
            {selectedCardEntry || matchedCardEntry ? content : "?"}
        </button>
    )
}