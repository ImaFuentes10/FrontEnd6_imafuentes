import { useEffect, useState, useCallback } from "react";

/* import { LuDot } from "react-icons/lu"; */

import TweetInfo from "./TweetInfo";
import Interactions from "./Interactions";
import { userData } from "./tweetCardApi";
import { getTweetDate } from "./tweetDateGenerator";

function TweetCard() {
    const [name, setName] = useState("");
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
    },[])

    if (!name || !username || !pictureURL) return null;


    return (
        <>
           
                <div className="border-b-1 border-zinc-800">
                    <TweetInfo name={name} username={username} picture={pictureURL} date={date} />
                    <Interactions className="" /> 

                </div>
            
        </>
    )
}                      
                    
export default TweetCard;               
                


