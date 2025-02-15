import React from 'react'

interface Props {
    handleClick: (emoji: string, index: number) => void
    className: string
    emojiName: string
    index: number
    children: string
}

export default function EmojiButton({handleClick, className, emojiName, index, children }: Props) {
    return (
        <button
            className={className}
            onClick={(e) => handleClick(emojiName, index)}
        >
            {children}
        </button>
    )
}