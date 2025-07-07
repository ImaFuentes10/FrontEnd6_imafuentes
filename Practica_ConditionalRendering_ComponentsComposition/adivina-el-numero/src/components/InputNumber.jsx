import { useEffect, useState } from "react"


export default function InputNumber(props) {
     const [inputNumber, setInputNumber] = useState("");
    
    const handleInput = (e) => {
        const value = e.target.value
        setInputNumber(value) 
        props.number(value)
    } 

    useEffect(() => {
        validateInput()
    },[inputNumber])

    const validateInput = () => {
        if(props.inputNumber > 100) {
            alert('El número debe ser menor a 100')
        } else if (props.inputNumber < 0) {
            alert('El número debe ser mayor a 0')
        }
    }

    useEffect(() => {
        if(props.clear){
            setInputNumber("")
        }
    },[props.clear])

    return (
        <>
            <input type="number" 
            min="0" max="100" 
            placeholder="Ingresa un número de 0 al 100" 
            className="bg-neutral-300 text-gray-900 w-60 m-5 p-1" 
            value={inputNumber} 
            onChange={handleInput}/>
        </>
    )
}