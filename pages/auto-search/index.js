import { useState, useEffect } from 'react'

const AutoSearch = () => {
    const [result, setResult] = useState([])
    const [input, setInput] = useState('')
    const [cache, setCache] = useState([])
    const [showResults, setShowResults] = useState(false)

    const fetchData = async () => {
        if(input) {
            if(cache[input]) {
                console.log('Returinig from cache')
                setInput(cache[input])
                return;
            }
    
            const response = await fetch(`https://dummyjson.com/recipes/search?q=${input}`)
            const data = await response.json()
            setResult(data.recipes)
            setCache((prev) => ({ ...prev, [input]: data.recipes }))
        }
    }

    useEffect(() => {
        const timer =  setTimeout(() => fetchData(), 300)
        return () => clearTimeout(timer)
    }, [input])

    console.log({result})
    
    return <div>
        <input placeholder="Search" className='search-input' onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowResults(true)} onBlur={() => setShowResults(false)}/>
        {showResults && <div className='suggestions'>
            {result?.map((item) => {
                return <div className='suggestion' key={item.id}>{item.name}</div>
            })}
        </div>}
    </div>
}

export default AutoSearch
