
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
           const dataSample: EmojisData[] = getRandomIndices(data)
           setEmojisData(dataSample)
           setIsGameOn(true)
        } catch (e: unknown){
            console.error("You got the error: ", e)
        } finally {
            setIsLoading(false)
        }
    }

    // Function to get five random elements from an Array and return them in a new array
    function getRandomIndices <Type>(dataArr: Type[]): Type[] {
        const randomIndicesArray: number[] = []
        const randomElementArray: Type[] = []
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * dataArr.length)
            if (!randomIndicesArray.includes(randomIndex)){
                randomIndicesArray.push(randomIndex)
                randomElementArray.push(dataArr[randomIndex])
            } else {
                i--
            }
        }
        return randomElementArray
    }

        /**
     * Challenge:
     * 1) Create a new function, "getRandomIndices", right below the "startGame" function. It should receive "data" as a parameter.
     * 2) In this new function, declare a new variable, "randomIndicesArray", and initialize it as an empty array.
     * 3) After declaring "randomIndicesArray", use a for loop to generate 5 random numbers within a range equivalent to the length of the "data" array and push these numbers to "randomIndicesArray". Return "randomIndicesArray" at the bottom of the function.
     * 4) In the try block of the "startGame" function, log the return value from "getRandomIndices" to the console, passing "data" to it as an argument.
     * 
     *💡 Hint: We want exactly 5 unique random numbers. What can you do inside the for loop to ensure that we'll get that?
    */

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