import React, { useEffect, useRef } from 'react'
import RegularButton from './RegularButton'
import Select from './Select.tsx'

interface Props {
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    isLoading: boolean
    firstRender: boolean
}

export default function Form({ handleSubmit, handleChange, firstRender, isLoading }: Props) {
    //Returns a form with a button to start the game ()
    const formRef = useRef<HTMLFormElement | null>(null)
    useEffect(() => {
        if (!firstRender){
            formRef.current?.focus()
        }
    }, [])

    return (
        <div className="form-container">
            <p className="p--regular">
                Customize the game by selecting an emoji category and a number of memory cards.
            </p>
            <form ref={formRef} className="wrapper">
                <Select handleChange={handleChange} />
                <RegularButton isBool={isLoading} handleClick={handleSubmit}>
                    Start Game
                </RegularButton>
            </form>
        </div>
    )
}