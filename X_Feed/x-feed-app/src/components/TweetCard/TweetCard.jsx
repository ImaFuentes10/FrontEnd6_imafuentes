import { useEffect, useState, useCallback, useReducer } from "react";

// ICON IMPORTS
import { LuDot } from "react-icons/lu";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaRetweet, FaRegComment } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { RiShare2Line } from "react-icons/ri";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";


function TweetCard(props) {
    const tweetInfo = props.tweetInfo;
    /* console.log(tweetInfo); */
 
    if (!tweetInfo.name || !tweetInfo.username || !tweetInfo.picture || !tweetInfo.body || !tweetInfo.comments || !tweetInfo.likes || !tweetInfo.retweets || !tweetInfo.views || !tweetInfo.createdAt ) return null;

    /* INTERACTIONS REDUCER */
    //crear context para poder sacar esto de la función
    const initialInteractions = {
        likes: tweetInfo.likes,
        like: false,
        retweets: tweetInfo.retweets,
        retweet: false,
        comments: tweetInfo.comments,
        comment: false,
        views: tweetInfo.views,
        view: false,
        hover: false
    }
    /* const [like, setLike] = useState(false) */
    const [interaction, dispatch] = useReducer(intReducer, initialInteractions);
    /* console.log(initialInteractions); */
    
    const like = () => dispatch({ type: 'LIKE'})
    const retweet = () => dispatch({ type: 'RETWEET'})
    const comment = () => dispatch({ type: 'COMMENT'})
    const view = () => dispatch({ type: 'VIEW'})
    const hover = () => dispatch({ type: 'HOVER'})
    

    return (
        <>
            <div onMouseOver={view} className="border-b-1 border-zinc-800">
                <div className="grid grid-cols-7 mt-2 mb-1">
                    <div className="col-span-1 ">
                        <div id="profPicContainer" className="border-1 border-zinc-800 size-12 mt-1 ml-4 rounded-full overflow-hidden">
                            <img src={tweetInfo.picture} id="profilePicture" />
                        </div>
                    </div>
                    <div className="col-span-6 pl-2">
                        <div className="flex text-center justify-between items-center ">
                            <div className="flex justify-left">
                                <h2 id="name" className="text-neutral-200 font-bold">{tweetInfo.name}<i id="verified"></i></h2>
                                <div className="flex ml-2">
                                    <span id="userName" className="text-zinc-500">@{tweetInfo.username}</span>
                                    <div className="flex text-zinc-500 font-bold items-center">
                                        <LuDot />
                                    </div>
                                    <span id="postTime" className="text-zinc-500">{tweetInfo.createdAt}</span>
                                </div>
                            </div>
                            <button className="flex text-zinc-500 justify-center items-center pr-2 text-2xl">
                                <MdOutlineMoreHoriz />
                            </button> 
                        </div>
                        <div className="flex text-neutral-200 pr-5">
                            <p id="tweetText">{tweetInfo.body}</p>
                        </div>
                    </div>    
                </div>
    
                <div className="flex justify-around items-center py-3">
                    <button onClick={comment} onMouseEnter={hover} onMouseLeave={hover} className="flex text-zinc-500 text-xs items-center">
                        { interaction.hover ? (
                            <>
                            <FaRegComment className="text-blue-500" />
                            <span className="ml-1 text-blue-500">{interaction.comments}</span>
                            </>
                        ) : (
                            <>
                            <FaRegComment />
                            <span className="ml-1">{interaction.comments}</span>
                            </>
                        )}
                            
                    </button>
                    <button onClick={retweet} className="flex text-zinc-500 text-xs items-center">
                        { interaction.retweet ? (
                            <>
                            <FaRetweet />
                            <span className="ml-1">{interaction.retweets}</span>
                            </>
                        ) : (
                            <>
                            <FaRetweet />
                            <span className="ml-1">{interaction.retweets}</span>
                            </>
                        )}
                        
                    </button>
                    <button className="flex text-zinc-500 text-xs items-center" onClick={like}>
                        { interaction.like ? (
                            <>
                            <GoHeartFill className="text-red-600" />
                            <span className="ml-1 text-red-300">{interaction.likes}</span>
                            </> 
                        ) : (
                            <>
                            <GoHeart />
                            <span className="ml-1">{interaction.likes}</span>
                            </>  
                        )}
                    </button>
                    <button className="flex text-zinc-500 text-xs items-center">
                        <IoStatsChartSharp />
                        <span className="ml-1">{interaction.views}</span>
                    </button>
                    <div className="flex justify-around">
                        <button className="flex text-zinc-500">
                            <MdBookmarkBorder />
                        </button>
                        <button className="flex text-zinc-500">
                            <RiShare2Line />
                        </button>
                    </div>
                </div>            
            </div>                    
        </>
    )
}                      
                    
export default TweetCard;               

function intReducer(state, action) {    

    switch (action.type) {
        case 'LIKE':
            return {
                ...state,
                like: !state.like,
                likes: state.like ? state.likes - 1 : state.likes + 1 
            }
        case 'RETWEET':
            return {
                ...state,
                retweet: !state.retweet,
                retweets: state.retweet ? state.retweets - 1 : state.retweets + 1 
            }
        case 'COMMENT':
            return {
                ...state,
                comment: !state.comment,
                comments: state.comment ? state.comments - 1 : state.comments + 1 
            }
        case 'VIEW':
            if(state.view) {
                return state
            }
            return {
                ...state,
                views: state.views + 1,
                view: true
            }
        case 'HOVER':
            return {
                ...state,
                hover: !state.hover
            }
        default: return state
    }
}

