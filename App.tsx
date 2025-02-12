
import React, { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

interface Data {
    name: string
    category: string
    group: string
    htmlCode: Array<string>
    unicode: Array<string>
}

export default function App() {
    // staet to track if game has started
    const [isGameOn, setIsGameOn] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    
    
    // function to flip isGameOn to true on game start
     async function startGame(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        e.preventDefault()
        setIsLoading(true)
        try{
           const response: Response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
           const data: Array<Data> = await response.json()
           setIsGameOn(true)
           console.log(data)
        } catch (e: unknown){
            console.error("You got the error: ", e)
        } finally {
            setIsLoading(false)
        }
    }
    
    // Function to turn a card over (currently just logging to console on click)
    function turnCard() {
        console.log("Memory card clicked")
    }
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form isLoading={isLoading} handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} />}
        </main>
    )
}