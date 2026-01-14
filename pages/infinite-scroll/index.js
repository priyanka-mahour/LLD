import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid'

import MemeCard from './meme-card'
import Shimmer from '../shimmer/index'

const InfiniteScroll = () => {
    const [memes, setMemes] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchMemes = async () => {
        try {
            setLoading(true);

            // Fetching the data
            const response = await fetch('https://meme-api.com/gimme/20');

            // Check if the response is okay (status code 200-299)
            if (!response.ok) {
                throw new Error('Failed to fetch memes');
            }

            // Parse the JSON data
            const data = await response.json();

            // Ensure data.memes is an array before proceeding
            if (!Array.isArray(data.memes)) {
                throw new Error('Unexpected response format');
            }

            debugger;
            // Set the memes state
            setMemes((memes) => [...memes, ...data.memes]);
        } catch (error) {
            console.error('Error fetching memes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight

        if (scrollPosition >= document.body.scrollHeight) {
            fetchMemes()
        }
    }

    useEffect(() => {
        fetchMemes()

        window.addEventListener(('scroll'), handleScroll)

        return (() => {
            window.removeEventListener(('scroll'), handleScroll)
        })
    }, [])

    console.log('memesssss', memes)

    return (
        <div key={uuidv4()}>
            <h1>Infinte Scroll!!!!</h1>
            {loading ? <Shimmer/> : memes.map((meme) => <MemeCard data={meme} />)}
        </div>
    )
}

export default InfiniteScroll;
