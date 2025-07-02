import { useEffect, useState, useCallback } from "react";

/* import { LuDot } from "react-icons/lu"; */

import TweetInfo from "./TweetInfo";
import Interactions from "./Interactions";
import { userData } from "./tweetCardApi";
import { getTweetDate } from "./tweetDateGenerator";

function TweetCard(props) {
   /*  const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [pictureURL, setPictureURL] = useState(null);
    const [date, setDate] = useState("");

    const getInfo = useCallback(async() => {
        const user = await userData();
        
        if(!user) return

        setName(user.name);
        setUsername(user.username)
        setPictureURL(user.picture)  
        
    },[])

    const generateNewDate = useCallback(() => {
        const newDate = getTweetDate();
        setDate(newDate);
    },[])
    
    useEffect(() => {
        getInfo()
        generateNewDate();
    },[]) */

    if (!props.name || !props.username || !props.picture || !props.text || !props.comments || !props.likes || !props.retweets || !props.views || !props.date ) return null;


    return (
        <>
           
                <div className="border-b-1 border-zinc-800">
                    <TweetInfo name={props.name} username={props.username} picture={props.picture} date={props.date} text={props.text} />
                    <Interactions comments={props.comments} likes={props.likes} retweets={props.retweets} views={props.views} /> 

                </div>
            
        </>
    )
}                      
                    
export default TweetCard;               
                


