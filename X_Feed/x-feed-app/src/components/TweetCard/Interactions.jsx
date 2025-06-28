import { useEffect, useState } from "react";
import { FaRetweet, FaRegComment } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { RiShare2Line } from "react-icons/ri";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { tweetInteractions } from "./tweetCardApi";

export default function Interactions(){
    const [comments, setComments] = useState(0);
    const [retweets, setRetweets] = useState(0);
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);

    const getInfo = async () => {
            const data = await tweetInteractions();
            setComments(data.comments);
            setRetweets(data.retweets);
            setLikes(data.likes);
            setViews(data.views)
        }
    
    useEffect(() => {
        getInfo()
    }, [])

    return (
        <div className="flex justify-around items-center py-3">
            <div className="flex text-zinc-500 text-xs items-center">
                <FaRegComment />
                <span className="ml-1">{comments}</span>
            </div>
            <div className="flex text-zinc-500 text-xs items-center">
                <FaRetweet />
                <span className="ml-1">{retweets}</span>
            </div>
            <div className="flex text-zinc-500 text-xs items-center">
                <GoHeart />
                <GoHeartFill className="text-red-600" />
                <span className="ml-1">{likes}</span>
            </div>
            <div className="flex text-zinc-500 text-xs items-center">
                <IoStatsChartSharp />
                <span className="ml-1">{views}</span>
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
    )
}