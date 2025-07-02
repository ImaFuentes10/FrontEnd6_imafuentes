import { useEffect, useState } from "react"
import { tweetBody } from "./tweetCardApi";

export default function Body(props) {
    /* const [text, setText] = useState("");

    const getInfo = async () => {
        const body = await tweetBody();
        //console.log(body)
        setText(body);
    }

    useEffect(() => {
        getInfo();
    },[]) */

    return (
            <div className="flex text-neutral-200 pr-5">
                <p id="tweetText">{props.text}</p>
            </div>
    )
}