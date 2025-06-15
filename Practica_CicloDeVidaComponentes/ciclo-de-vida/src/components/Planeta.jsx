import { useEffect } from "react";
import { useState } from "react";

function Planet ({name}) {
    const [message, setMessage] = useState("")

    useEffect (() => {
        setMessage(`El planeta ${name} ha aparecido`)

        return setMessage(`El planeta ${name} ha desaparecido`)
    },[])

    return (
        <>
            <p>{message}</p>
        </>
    )
}

export default Planet