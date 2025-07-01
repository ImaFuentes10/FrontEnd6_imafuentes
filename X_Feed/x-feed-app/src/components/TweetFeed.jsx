import { useEffect, useRef, useState, useCallback } from "react";
import TweetCard from "./TweetCard/TweetCard";
import TweetComposer from "./TweetComposer";
import SideBar from "./SideBar";


function TweeetFeed () {
    const [tweets, setTweets] = useState(() => {
        return Array.from({ length: 8 }, (_,i) => ({ id: i, createdAt: TweetCard.date}))
    });

    const scrollRef = useRef();
    const [nextTweetId, setNextTweetId] = useState(8);
    const lastScrollTop = useRef(0);

    const generateNewTweets = useCallback(() => {
        const newTweetsCount = 1; // Solo generar 3 tweets a la vez
        const newTweets = Array.from({ length: newTweetsCount }, (_, i) => ({
            id: nextTweetId + i,
            createdAt: Date.now() - (nextTweetId + i) * 1000
        }));
        
        setTweets(prev => [...prev, ...newTweets]);
        setNextTweetId(prev => prev + newTweetsCount);
    }, [nextTweetId])

    const handleScroll = useCallback(() => {
        const container = scrollRef.current;
        /* if (!container || isLoading) return; */

        const { scrollTop, scrollHeight, clientHeight } = container;
        const currentScrollTop = scrollTop;

        // Solo generar nuevos tweets si:
        // 1. Estamos haciendo scroll hacia abajo
        // 2. Estamos cerca del final (dentro de los últimos 200px)
        const isScrollingDown = currentScrollTop > lastScrollTop.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;

        if (isScrollingDown && isNearBottom) {
            /* setIsLoading(true); */
            
            // Pequeño delay para evitar spam de generación
            setTimeout(() => {
                generateNewTweets();
            /*     setIsLoading(false);*/
            }, 100);
        }

        lastScrollTop.current = currentScrollTop;
    }, [generateNewTweets/* , isLoading */]);
    


    return (
        <>
            <div className="bg-black w-screen h-screen grid grid-cols-16 overflow-y-scroll" ref={scrollRef} onScroll={handleScroll}>
                <SideBar />
                <div className="flex flex-col col-span-10 border-x border-zinc-900">
                    <TweetComposer />
                    <ul>
                        {tweets.map((tweet) => <TweetCard key={tweet.id} />)}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TweeetFeed;