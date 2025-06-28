import { useState } from "react";
import TweetCard from "./TweetCard/TweetCard";
import TweetComposer from "./TweetComposer";
import SideBar from "./SideBar";


function TweeetFeed () {

    return (
        <>
            <div className="bg-black w-screen h-screen flex">
                <SideBar />
                <div className="flex flex-col w-128 border-x border-zinc-900 flex-wrap">
                        <TweetComposer />
                        <TweetCard  />
                </div>
            </div>
        </>
    )
}

export default TweeetFeed;