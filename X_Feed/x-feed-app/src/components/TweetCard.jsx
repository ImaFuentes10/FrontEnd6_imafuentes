import { useState } from "react";
import { MdOutlineMoreHoriz, MdBookmarkBorder } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { FaRetweet, FaRegComment } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { RiShare2Line } from "react-icons/ri";
import { IoStatsChartSharp } from "react-icons/io5";

function TweetCard(props) {


    return (
        <>
            <div className="grid grid-cols-7 border-b-1 border-zinc-800">
                <div className="col-span-1">
                    <div id="profPicContainer" className="border-1 border-zinc-800 size-12 mt-1 ml-4 rounded-full">
                        <img src="" alt="" id="profilePicture"/>
                    </div>
                </div>

                <div className="flex justify-between flex-col pl-2 col-span-6 mb-1">
                    <div className="flex text-center justify-between items-center">
                        <h2 id="name" className="text-neutral-200 font-bold">{props.name}<i id="verified"></i> </h2>
                        <div className="flex justify-center">
                            <span id="userName" className="text-zinc-500">@{props.userName}</span>
                            <div className="flex text-zinc-500 font-bold items-center">
                                <LuDot />
                            </div>
                            <span id="postTime" className="text-zinc-500">{props.date}</span>
                        </div>
                        
                        <div className="flex text-zinc-500 justify-center items-center pr-2 text-2xl">
                            <MdOutlineMoreHoriz />
                        </div>
                    </div>
                    <div className="flex text-neutral-200 pr-2 mb-3">
                        <p id="tweetText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium inventore porro nam totam blanditiis necessitatibus explicabo in. Veritatis neque quisquam labore! Fuga harum quis laborum incidunt eius voluptate eligendi non.</p>
                    </div>
                    <div className="flex justify-around">
                        <div className="flex text-zinc-500">
                            <FaRegComment />
                            <span></span>
                        </div>
                        <div className="flex text-zinc-500">
                            <FaRetweet />
                            <span></span>
                        </div>
                        <div className="flex text-zinc-500">
                            <GoHeart />
                            <GoHeartFill />
                            <span></span>
                        </div>
                        <div className="flex text-zinc-500">
                            <IoStatsChartSharp />
                            <span></span>
                        </div>
                        <div className="flex justify-around">
                            <div className="flex text-zinc-500">
                                <MdBookmarkBorder />
                            </div>
                            <div className="flex text-zinc-500">
                                <RiShare2Line />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}                      
                    
export default TweetCard;               
                


