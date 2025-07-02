import { useEffect, useRef, useState, useCallback } from "react";
import TweetCard from "./TweetCard/TweetCard";
import TweetComposer from "./TweetComposer";
import SideBar from "./SideBar";
import { userData, tweetBody, tweetInteractions } from "./TweetCard/tweetCardApi";
import { getTweetDate } from "./TweetCard/tweetDateGenerator";

function TweeetFeed () {
    const [tweets, setTweets] = useState([])/* useState(() => {
        return Array.from({ length: 8 }, () => ({ 
            id: crypto.randomUUID(), 
            createdAt: TweetCard.date}))
    }); */

    useEffect(()=> {
        const fetchInitialTweets = async() => {
        const initialTweets = 6
        for(let i=0; i<initialTweets; i++) {
            await generateNewTweets(initialTweets)
            }
        };
        fetchInitialTweets();
    },[])

    const scrollRef = useRef();
   /*  const [nextTweetId, setNextTweetId] = useState(8); */
    const lastScrollTop = useRef(0);
    const [isLoading, setIsLoading] = useState(false);

    const generateNewTweets = useCallback(async (tweets) => {
        const newTweetsCount = tweets;
        const newTweets = await Promise.all(
            Array.from({ length: newTweetsCount }, async () => {
                const user = await userData();
                if(!user /* || !name || !username || !pictureURL */) return

                const body = await tweetBody();
                if(!body) return

                const interactions = await tweetInteractions();
                if(!interactions) return

                const date = getTweetDate();

                return {
                    id: crypto.randomUUID(),
                    createdAt: date,
                    ...user,
                    ...body,
                    ...interactions
                };
            })
        );
        setTweets(prev => [...prev, ...newTweets.filter(Boolean)]); //Agrego nuevos tweets. Filtro a sólo booleanos para evitar tweets con propiedades undefined
    }, []);

    const handleScroll = useCallback(() => {
        const container = scrollRef.current;
        if (!container || isLoading) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const currentScrollTop = scrollTop;

        // Solo generar nuevos tweets si:
        // 1. Estamos haciendo scroll hacia abajo
        // 2. Estamos cerca del final (dentro de los últimos 200px)
        const isScrollingDown = currentScrollTop > lastScrollTop.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;

        if (isScrollingDown && isNearBottom) {
            setIsLoading(true);
            
            // Pequeño delay para evitar spam de generación
            setTimeout(() => {
                generateNewTweets(3);
                setIsLoading(false);
            }, 100);
        }

        lastScrollTop.current = currentScrollTop;
    }, [generateNewTweets, isLoading ]);
    


    return (
        <>
            <div className="bg-black w-screen h-screen grid grid-cols-16 overflow-y-scroll" ref={scrollRef} onScroll={handleScroll}>
                <SideBar />
                <div className="flex flex-col col-span-10 border-x border-zinc-900">
                    <TweetComposer />
                    <ul>
                        {tweets.map((tweet) =><TweetCard key={tweet.id} name={tweet.name} username={tweet.username} picture={tweet.picture} date={tweet.createdAt} text={tweet.body} likes={tweet.likes} comments={tweet.comments} retweets={tweet.retweets} views={tweet.views} /> )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TweeetFeed;