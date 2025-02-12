
import React, { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
    // staet to track if game has started
    const [isGameOn, setIsGameOn] = useState<boolean>(false)

        /**
     * Challenge:
     * 1) Turn startGame into an async function.
     * 2) Use the try...catch syntax and make a fetch request to the emoji API, using this url:         "https://emojihub.yurace.pro/api/all/category/animals-and-nature". Store the response in a      const "response".
     * 3) Check if the response is ok.
     *      a) If yes, store the fetched data in a const "data". Log the data to the console.               Call setIsGameOn(true).
     *      b) If no, throw an error with a custom error message, and inside the catch block, log           the error message to the console.
     * 💡 Hint: Remember the await keyword!
     * ⚠️ Warning: The emojis rendered will still be those from the hardcoded array.
     */
    
    
    // function to flip isGameOn to true on game start
     async function startGame(e) {
        e.preventDefault()
        try{
           const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
           const data = await response.json()
           console.log(data)
        } catch (e){
            console.error("You got the error: ", e)
        }
        setIsGameOn(true)
    }
    
    // Function to turn a card over (currently just logging to console on click)
    function turnCard() {
        console.log("Memory card clicked")
    }
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} />}
        </main>
    )
}