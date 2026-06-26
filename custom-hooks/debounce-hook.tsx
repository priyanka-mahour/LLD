import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
    const [debounceVal, setDebounceVal] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceVal(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return debounceVal
}
