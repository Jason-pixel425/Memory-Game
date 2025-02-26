
interface Category {
    name: string
    value: string
}

interface Number {
    value: string
}

interface Data {
    category: Category[]
    number: Number[]
}


const data: Data = {
    category: [
        {
            name: "Animals and nature",
            value: "animals-and-nature"
        },
        {
            name: "Food and drink",
            value: "food-and-drink"
        },
        {
            name: "Travel and places",
            value: "travel-and-places"
        },
        {
            name: "Objects",
            value: "objects"
        },
        {
            name: "Symbols",
            value: "symbols"
        }
    ],
    number: [
        {
            value: "10"
        },
        {
            value: "20"
        },
        {
            value: "30"
        },
        {
            value: "40"
        },
        {
            value: "50"
        },
    ]
}

export { data, Category, Number, Data }