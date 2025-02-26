import React, { useState, useEffect } from 'react'
import { EmojisData, SelectedCards } from './components/emojisData.ts'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'
import AssistiveTechInfo from './components/AssistiveTechInfo.tsx'
import GameOver from './components/GameOver.tsx'
import ErrorCard from './components/ErrorCard.tsx'

interface formData {
    category: string
    number: number
}

export default function App() {
    
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
    const [formData, setFormData] = useState<formData>({category : "animals-and-nature", number: 10})
    // state to track if game has started
    const [isGameOn, setIsGameOn] = useState<boolean>(false)
    // State to prevent multiple concurent fetch calls
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // Hold data slice of returned fetch
    const [emojisData, setEmojisData] = useState<EmojisData[]>([])
    // Tracks the one, two or zero selected cards by user
    const [selectedCards, setSelectedCards] = useState<SelectedCards[]>([])
    // Keeps track of all cards the user has matched
    const [matchedCards, setMatchedCards] = useState<SelectedCards[]>([])
    // Used to check if there is an error in the fetch request
    const [isError, setIsError] = useState<boolean>(false)


    // Derived value for isGameOver
    // Before game start, boolean is false (length === 0) otherwise remains false unless data and matched cards length is true
    const isGameOver: boolean = emojisData.length === 0 ? false : matchedCards.length === emojisData.length ? true : false

    // Debuggin console.logs
    console.log("is game over", isGameOver)
    console.log("matched cards", matchedCards)
    console.log("selectedCards", selectedCards)
    
     async function startGame(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        e.preventDefault()
        setIsLoading(true)
        try{
           const response: Response = await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`)
           
           if (!response.ok) {
            throw new Error("Could not fetch data from API")
           }
           
           const data: EmojisData[] = await response.json()

           // Get random five emoji data from api.
           const dataSlice = getDataSlice(data)
           const emojisArr = getEmojisArr(dataSlice)
           setEmojisData(emojisArr)
           setIsGameOn(true)
        } catch (e: unknown){
            console.error("You got the error: ", e)
            setIsError(true)
        } finally {
            setIsLoading(false)
            setIsFirstRender(false)
        }
    }
    
    // Matched card checking from selectedCards state. If matching name property, set in matchedCards (spreding prev values)
    useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0]?.name === selectedCards[1]?.name){
            setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
        }
        // setMatchedCards()
    }, [selectedCards])

    // Function to get five random indices from an Array and return them in a new array
    function getRandomIndices <EmojisData>(dataArr: EmojisData[]): number[] {
        const randomIndicesArray: number[] = []
        for (let i = 0; i < formData.number; i++) {
            const randomIndex = Math.floor(Math.random() * dataArr.length)
            if (!randomIndicesArray.includes(randomIndex)){
                randomIndicesArray.push(randomIndex)
            } else {
                i--
            }
        }
        return randomIndicesArray
    }

    // function to get five random elements from an Array and return them in a new array.
    // Uses getRandomIndices
    function getDataSlice (dataArr: EmojisData[]): EmojisData[] {
        const randomIndicesArr: number[] = getRandomIndices(dataArr)
        const randomDataArr: EmojisData[] = randomIndicesArr.map(index => dataArr[index])
        return randomDataArr
    }

// Duplicates Items in array and shuffles them with Fisher-Yates algorithm before returning array
    function getEmojisArr(data: EmojisData[]): EmojisData[] {
        const pairedEmojisArr: EmojisData[] = [...data, ...data]
        for (let i = pairedEmojisArr.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [pairedEmojisArr[i], pairedEmojisArr[j]] = [pairedEmojisArr[j], pairedEmojisArr[i]]; 
          } 
        return pairedEmojisArr
    }

    
    // Function to turn a card over (currently just logging to console on click)
    function turnCard(emojiName: string, index: number) {
        // console.log("Memory card clicked", emojiName, "  ", index)
        const cardCheck: SelectedCards | undefined = selectedCards.find(card => card.index === index)

        if (!cardCheck && selectedCards.length < 2){
            setSelectedCards(prevSelectedCards => [...prevSelectedCards, {name: emojiName, index: index}])
        }
        if (selectedCards.length === 2) {
            setSelectedCards([{name: emojiName, index: index}])
        }
        // If there are two cards in the array, and they match, mark them as matched 
        // If there are two cards in the array, set array to empty array
        // else, add card to array.
        
    }

    // Function to start a new Game | Passed to GameOver component
    function resetGame(): void {
        setIsGameOn(false)
        setSelectedCards([])
        setMatchedCards([])
        setIsError(false)
    }
    
    function handleFormChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        setFormData(prevFormData => {
            return ({
                ...prevFormData,
               [e.target.name]: e.target.value
            })
        })
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && !isError && <Form isLoading={isLoading} handleChange={handleFormChange} firstRender={isFirstRender} handleSubmit={startGame} />}
            {isGameOn && !isGameOver && <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards} /> }
            {isError && <ErrorCard handleClick={resetGame} />}
            {isGameOver && <GameOver resetGame={resetGame} />}
            {isGameOn && <MemoryCard selectedCards={selectedCards} 
                matchedCards={matchedCards} 
                emojisData={emojisData} 
                handleClick={turnCard} />}
        </main>
    )
}