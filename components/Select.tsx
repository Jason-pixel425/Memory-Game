import React from 'react'
import { data, Category, Number, Data } from '../data/data.ts'

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select({handleChange}: Props): React.JSX.Element[] {

    
    const selects: React.JSX.Element[] = (Object.entries(data) as [keyof Data, (Category | Number)[]][]).map(([key, values]) => {
        return(
        <div key={`div ${key}`} className="form__inner-wrapper">
            <label htmlFor={key}>Select a category</label>
            <select key={`category ${key}`} name={key} id={key} onChange={handleChange}>
                {values.map((item, index) => {
                    return (
                    <option key={`Login ${item.value} ${index}`} value={item.value} id={item.value}  >
                        {"name" in item ? item.name : item.value }
                    </option>)
                })}
            </select>
        </div>
        )
    })
    

    return selects
}