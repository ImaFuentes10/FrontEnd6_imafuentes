import { useReducer, useRef, useCallback, useEffect } from "react";

const initialState = { count: 0, history: [], status: [], prev: [] };

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { 
                count: state.count + action.value, 
                history: [...state.history, `+${action.value} (Nuevo valor: ${state.count + action.value})`],
                /* status: state.status.push("+") */
                prev: [...state.prev, { count: state.count, history: state.history }]
            };
        case "decrement":
            return {
                count: state.count - action.value, 
                history: [...state.history, `-${action.value} (Nuevo valor: ${state.count - action.value})`],
                /* status: state.status.push("-") */
                prev: [...state.prev, { count: state.count, history: state.history }]
            };
        case "reset":
            return {
                ...initialState,
                prev: [...state.prev, { count: state.count, history: state.history }]
            }
        case "undo":{
            if(state.prev.length === 0) return state;
            const lastState = state.prev[state.prev.length -1];
            return {
                ...lastState,
                prev: state.prev.slice(0, -1)
            }
        }
        case "refresh": 
            return action.localState
        default:
            return state;
    }
}


export default function CounterGame() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const incrementBtnRef = useRef(null);
    const inputNumberRef = useRef(null);
    

    // Fijar el foco en el botón de incremento al renderizar
    useEffect(() => {
        const counterState = localStorage.getItem("CounterState")
        if(!counterState) return

        const localState = JSON.parse(counterState);
        //console.log(localState);
        handleRefresh(localState)
    }, []);

    const handleRefresh = useCallback((localState) => {
        dispatch({ type: "refresh", localState: localState})
    },[])

    const handleIncrement = useCallback(() => {
        dispatch({ type: "increment", value: 1});
    }, []);

    const handleDecrement = useCallback(() => {
        dispatch({ type: "decrement", value: 1 });
    }, []);

    const handleReset = useCallback(() => {
        dispatch({ type: "reset" });
    }, []);

    const handleUndo = useCallback(() => {
        dispatch({ type: "undo" });
    }, []);

    const handleAdd = useCallback(() => {
        if(!inputNumberRef.current.value) return
        dispatch({ type: "increment" , value: parseFloat(inputNumberRef.current.value)})
    },[])

    const handleSubstract = useCallback(() => {
        if(!inputNumberRef.current.value) return
        dispatch({ type: "decrement", value: parseFloat(inputNumberRef.current.value)})
    },[])

    useEffect(() => {
        localStorage.setItem("CounterState",JSON.stringify(state))
    },[state])
    

    return (
        <div className="flex flex-col justify-around text-center">
            <h2 className="p-2 font-bold">Contador: {state.count}</h2>
            <div className="flex justify-around">
                <button ref={incrementBtnRef} onClick={handleIncrement} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md w-8">+</button>
                <button onClick={handleDecrement} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md w-8">-</button>
                <button onClick={handleReset} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md">Reset</button>  
                <button onClick={handleUndo} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md">Deshacer</button> 
            </div>

            <div>
                <input type="number" className="bg-gray-400 mt-3 p-1 text-gray-800 placeholder-gray-700 rounded-md w-40" placeholder="Ingresa un número" ref={inputNumberRef}/>
                <button onClick={handleAdd} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md mx-2 w-8">+</button>
                <button onClick={handleSubstract} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md w-8">-</button>
            </div>
            

            <h3 className="p-2 font-light">Historial de cambios:</h3>
            <ul>
                {state.history.map((entry, index) => (
                    <li key={index} className="p-1 font-bold">{entry}</li>
                ))}
            </ul>
        </div>
    );
}