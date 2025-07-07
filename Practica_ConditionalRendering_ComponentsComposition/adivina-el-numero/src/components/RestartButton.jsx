import { useEffect } from "react"

export default function RestartButton (props) {

    useEffect(() => {
        if(props.action) {
            props.clear()
        }
    },[props.action])


    return (
        <>
            <button className="p-2 text-neutral-300 bg-gray-500 border-1 border-gray-900 rounded-md"
            onClick={() => {
                props.action(true)
            } 
            }> RESTART </button>
        </>
    )
}