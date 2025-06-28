import { useState } from "react";

/* import { LuDot } from "react-icons/lu"; */

import TweetInfo from "./TweetInfo";
import Interactions from "./Interactions";
import Body from "./Body";

function TweetCard() {


    return (
        <>
            <div className="border-b-1 border-zinc-800">
                <TweetInfo  />
                <Interactions className="" />
            </div>
        </>
    )
}                      
                    
export default TweetCard;               
                


