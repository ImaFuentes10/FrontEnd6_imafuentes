import { LuDot } from "react-icons/lu";
import { MdOutlineMoreHoriz} from "react-icons/md";
import { userData } from "./tweetCardApi";
import { useEffect, useState, useCallback } from "react";
import { getTweetDate } from "./tweetDateGenerator";
import Body from "./Body";

export default function TweetInfo(props) {

    return (
        <>
        <div className="grid grid-cols-7 mt-2 mb-1">
            <div className="col-span-1 ">
                <div id="profPicContainer" className="border-1 border-zinc-800 size-12 mt-1 ml-4 rounded-full overflow-hidden">
                    <img src={props.picture} id="profilePicture" />
                </div>
            </div>
            <div className="col-span-6 pl-2">
                <div className="flex text-center justify-between items-center ">
                    <div className="flex justify-left">
                        <h2 id="name" className="text-neutral-200 font-bold">{props.name}<i id="verified"></i></h2>
                        <div className="flex ml-2">
                            <span id="userName" className="text-zinc-500">@{props.username}</span>
                            <div className="flex text-zinc-500 font-bold items-center">
                                <LuDot />
                            </div>
                            <span id="postTime" className="text-zinc-500">{props.date}</span>
                        </div>
                    </div>
                    <div className="flex text-zinc-500 justify-center items-center pr-2 text-2xl">
                        <MdOutlineMoreHoriz />
                    </div>
                    </div>
                    <Body text={props.text} />
                </div>
            </div>
        </>
    )
}

