import { useEffect, useState } from "react";
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

            // Set the memes state
            setMemes((memes) => [...memes, ...data.memes]);
        } catch (error) {
            console.error('Error fetching memes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        // window.scrollY - How much you have scrolled the page
        // window.innerHeight - current viewport or screen innerHeight
        // document.body.scrollHeight - totall height of the page if we scroll
        const scrollPosition = window.scrollY + window.innerHeight

        if (scrollPosition >= document.body.scrollHeight) {
            fetchMemes()
        }
    }

    useEffect(() => {
        //initial page load pe API call
        fetchMemes()

        window.addEventListener(('scroll'), handleScroll)

        return (() => {
            window.removeEventListener(('scroll'), handleScroll)
        })
    }, [])

    console.log('memesssss', memes)

    return (
        <div key={crypto.randomUUID()}>
            <h1>Infinte Scroll!!!!</h1>
            {loading ? <Shimmer/> : memes.map((meme) => <MemeCard data={meme} />)}
        </div>
    )
}

export default InfiniteScroll;
