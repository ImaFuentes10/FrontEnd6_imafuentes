import { useState, useEffect } from "react";

export default function Message(props) {
    const [message, setMessage] = useState("")
    
    useEffect(() => {
            handleMessage()
    },[props.action])

    useEffect(() => {
        if(props.action) {
            props.clear()
        }
    },[props.action])

    const handleMessage = () => {

        if(!props.inputNumber || props.inputNumber.length < 1){
            setMessage("")
            return
        } else if(props.inputNumber > 100) {
            setMessage("El número debe ser menor a 100")
        } else if(props.inputNumber == props.randomNumber) {
            setMessage("Correcto")
        } else if(props.inputNumber > props.randomNumber) {
            setMessage("El número es menor")
        } else { setMessage("El número es mayor")}
    }

    return (
        <>
            <h1 className="text-neutral-300 m-5 font-bold">
               { message }
            </h1>
        </>
        
    )
    
}