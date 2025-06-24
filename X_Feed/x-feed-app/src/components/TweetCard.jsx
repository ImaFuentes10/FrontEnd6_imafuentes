import { useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { LuDot } from "react-icons/lu";

function TweetCard(props) {


    return (
        <>
            <div className="flex border-b-1 border-zinc-800 flex-col">
                <div className="flex justify-between">
                    <div className="px-1">
                        <div id="profPicContainer">
                            <img src="" alt="" id="profilePicture"/>
                        </div>
                    </div>
                    
                    <div className="flex text-center justify-left items-center w-xl">
                        <h2 id="name" className="text-neutral-200 font-bold pr-1">{props.name}<i id="verified"></i> </h2>
                        <span id="userName" className="text-zinc-500 pr-1">@{props.userName}</span>
                        <div className="flex text-zinc-500 font-bold pr-1">
                            <LuDot />
                        </div>
                        
                        <span id="postTime" className="text-zinc-500 pr-2">{props.date}</span>
                    </div>
                      
                    <div className="flex text-zinc-500 justify-center items-center pr-2 text-2xl">
                        <MdOutlineMoreHoriz />
                    </div>        
                </div>
               
                <div>
                    <p id="tweetText">hola</p>
                </div>
                <div>
                    <div>
                        <i></i>
                        <span></span>
                    </div>
                    <div>
                        <i></i>
                        <span></span>
                    </div>
                    <div>
                        <i></i>
                        <span></span>
                    </div>
                    <div>
                        <i></i>
                        <span></span>
                    </div>
                    <div>
                        <i></i>
                    </div>
                    <div>
                        <i></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TweetCard;