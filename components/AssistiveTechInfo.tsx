import React from 'react'
import { EmojisData, SelectedCards } from './emojisData.ts'
interface Props {
    emojisData: EmojisData[]
    matchedCards: SelectedCards[]
}

export default function AssistiveTechInfo ({emojisData, matchedCards}: Props) {
    return (
        <section aria-atomic="true" aria-live="polite" className="sr-only">
            <h2>Game Status</h2>
            <p>Number of matched pairs: {matchedCards.length / 2}</p>
            <p>Number of cards left to match {emojisData.length - matchedCards.length}</p>
        </section>
    )
}