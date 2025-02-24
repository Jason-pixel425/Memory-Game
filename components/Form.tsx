import React from 'react'
import RegularButton from './RegularButton'

interface Props {
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    isLoading: boolean
}

export default function Form({ handleSubmit, handleChange, isLoading }: Props) {
    //Returns a form with a button to start the game ()
    

    return (
        <div className="form-container">
            <form className="wrapper">
                <div className="form__inner-wrapper">
                    <label htmlFor="category">Select a category</label>
                    <select name="category" id="category" onChange={handleChange}>
                        <option value="animals-and-nature">Animals and Nature</option>
                        <option value="food-and-drink">Food and Drink</option>
                        <option value="travel-and-places">Travel and Places</option>
                        <option value="objects">Objects</option>
                        <option value="symbols">Symbols</option>
                    </select>
                </div>
                <div className="form__inner-wrapper">
                    <label htmlFor="number">Select number of pairs</label>
                    <select name="number" id="number" onChange={handleChange}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <RegularButton isBool={isLoading} handleClick={handleSubmit}>
                    Start Game
                </RegularButton>
            </form>
        </div>
    )
}