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
    const btnAria: string = matchedCardEntry ? "Matched" : selectedCardEntry ? "Not Matched yet" : "Card upside down"
    // User needs to know if card is selected, card is matched, or card is hidden. Card name
    return (
        <button
            className={`btn btn--emoji ${btnStyle}`}
            onClick={() => handleClick(emojiName, index)}
            disabled={disabled}
            aria-label={`Position ${index + 1}: ${disabled ? emojiName : "unknown"}. ${btnAria}`}
            aria-live="polite"
        >
            {selectedCardEntry || matchedCardEntry ? content : "?"}
        </button>
    )
}