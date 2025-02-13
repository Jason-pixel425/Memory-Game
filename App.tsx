
import React, { useState, useEffect } from 'react'
import { EmojisData } from './components/emojisData.ts'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'



export default function App() {
    // staet to track if game has started
    const [isGameOn, setIsGameOn] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [emojisData, setEmojisData] = useState<EmojisData[]>([])


     async function startGame(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        e.preventDefault()
        setIsLoading(true)
        try{
           const response: Response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
           
           if (!response.ok) {
            throw new Error("Could not fetch data from API")
           }
           
           const data: EmojisData[] = await response.json()

           // Get first five emoji data from api.
           const dataSample: EmojisData[] = data.slice(0, 5);

           setEmojisData(dataSample)
           setIsGameOn(true)
        } catch (e: unknown){
            console.error("You got the error: ", e)
        } finally {
            setIsLoading(false)
        }
    }

    // Testing emojis data. ** REMOVE BEFORE PUBLISH **
    useEffect(() => {
        console.log(emojisData)
    }, [emojisData])
    
    // Function to turn a card over (currently just logging to console on click)
    function turnCard() {
        console.log("Memory card clicked")
    }
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form isLoading={isLoading} handleSubmit={startGame} />}
            {isGameOn && <MemoryCard emojisData={emojisData} handleClick={turnCard} />}
        </main>
    )
}