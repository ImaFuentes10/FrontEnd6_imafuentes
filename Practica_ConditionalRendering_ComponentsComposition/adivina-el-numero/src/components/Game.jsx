import { useEffect, useState } from "react";
import Message from "./Message";
import InputNumber from "./InputNumber";
import RestartButton from "./RestartButton";

export default function Game() {
    const [randomNumber, setRandomNumber] = useState(null);
    const [inputNumber, setInputNumber] = useState(null);
    const [action, setAction] = useState(false);
    const [restart, setRestart] =useState(false)

    useEffect(() => {
        const random = Math.floor(Math.random() * 100) + 1;
        return setRandomNumber(random)
    },[])

    const receiveInputNumber = (num) => {
        setInputNumber(num)
    }
    
    useEffect(() => {
        setAction(true)
    },[inputNumber])
        
    const handleClearAction = () => setAction(false)

    const receiveAction = (act) => {
       /*  console.log(act) */
        setRestart(act)
    }

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 100) + 1)
        setInputNumber(null)
    },[restart])

    const handleClearRestart = () => setRestart(false)

    return (
        <>
            <InputNumber number={receiveInputNumber} clear={restart}/>
            <RestartButton action={receiveAction} clear={handleClearRestart}/>
            <Message inputNumber={inputNumber} randomNumber={randomNumber} action={action} clear={handleClearAction} />
           {/*  <p className="text-neutral-300">{randomNumber} {inputNumber} </p> */}
        </>
    )
    
}