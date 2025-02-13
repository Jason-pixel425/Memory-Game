
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
           const dataSample: EmojisData[] = getDataSlice(data)
           setEmojisData(dataSample)
           setIsGameOn(true)
        } catch (e: unknown){
            console.error("You got the error: ", e)
        } finally {
            setIsLoading(false)
        }
    }

    // Function to get five random elements from an Array and return them in a new array
    function getRandomIndices <EmojisData>(dataArr: EmojisData[]): number[] {
        const randomIndicesArray: number[] = []
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * dataArr.length)
            if (!randomIndicesArray.includes(randomIndex)){
                randomIndicesArray.push(randomIndex)
            } else {
                i--
            }
        }
        return randomIndicesArray
    }

    function getDataSlice (dataArr: EmojisData[]): EmojisData[] {
        const randomIndicesArr = getRandomIndices(dataArr)
        console.log(randomIndicesArr)
        const randomDataArr: EmojisData[] = []
        for (const number of randomIndicesArr) {
            randomDataArr.push(dataArr[Number(number)])
        }
        return randomDataArr
    }

    /**
     * Challenge:
     * 1) Below the "startGame" function, create a new function called "getDataSlice". The function should reveice "data" as a parameter.
     * 2) Inside this function, make a call to "getRandomIndicies" and store the return value in a variable called "randomIndices".
     * 3) Map over "randomIndices" and use the random numbers stored in this array to create a new array of random emojis selected from "data". 
     * Store this new array in a variable called "dataSlice" and return it at the bottom of the function.
     * 4) Inside the try block of the "startGame" function, make a call to "getDataSlice", passing "data" as an argument. Save the return value in a variable called "dataSlice".
     * 5) Delete the "dataSample" variable and replace "dataSample" with the new "dataSlice" variable in the "setEmojisData" function.
     * 6) Run the code and start a new game to check that your code is working.
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