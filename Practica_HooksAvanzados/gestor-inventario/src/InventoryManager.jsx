import { useReducer, useRef, useCallback, useState, useEffect } from "react";

const initialState = { products: [], search:[], onSearch: false};

function reducer(state, action) {
    switch (action.type) {
        case "add":
            return {
                products: [...state.products, {
                    id: Date.now(),
                    name: action.name,
                    quantity: 1
                }]
            };
        case "increment":
            return {
                products: state.products.map(p =>
                    p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
                )
            };
        case "decrement":
            return {
                products: state.products.map(p =>
                    p.id === action.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                )
            };
        case "remove":
            return {
                products: state.products.filter(p => p.id !== action.id)
            };
        case "search":
            return {
                ...state,
                search: state.products.filter(p => p.name.includes(action.search)),
                onSearch: action.search === "" ? false : true
            }
        case 'refresh':
            return action.localState
        case 'clear':
            return initialState
        default:
            return state;
    }
}

export default function InventoryManager() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const inputRef = useRef(null);
    const [search, setSearch] = useState("")
    const searchRef = useRef(null);

    const handleAddProduct = useCallback(() => {
        if (inputRef.current.value.trim() !== "") {
            dispatch({ type: "add", name: inputRef.current.value });
            inputRef.current.value = ""; // Limpiar input
            if(searchRef.current.value !== "") 
                dispatch({type: "search", search: search})
        }
    },[search])

    const handleIncrement = useCallback((id) => {
        dispatch({ type: "increment", id });
        if(searchRef.current.value !== "") 
            dispatch({type: "search", search: search})
    }, [search]);

    const handleDecrement = useCallback((id) => {
        dispatch({ type: "decrement", id });
        if(searchRef.current.value !== "") 
            dispatch({type: "search", search: search})
    }, [search]);

    const handleRemove = useCallback((id) => {
        dispatch({ type: "remove", id });
        if(searchRef.current.value !== "") 
            dispatch({type: "search", search: search})
    }, [search]);

    const handleSearchProduct = useCallback((search) => {
        dispatch({type: "search", search: search})
        /* console.log(search) */
    }, [])

    useEffect(() => {
        const inventoryState = localStorage.getItem("Inventory");
        if(!inventoryState) return
        const localState = JSON.parse(inventoryState);
        dispatch({ type: 'refresh', localState})
        dispatch({type: "search", search: ""})
    }, [])

    useEffect(() => {
        localStorage.setItem( "Inventory", JSON.stringify(state))
    }, [state])

    const handleEmptyInventary = useCallback(() => {
        if(confirm("¿Deseas vaciar el inventario?")){
            dispatch({ type: 'clear'});
            if(inputRef.current) inputRef.current.value = "";
            if (searchRef.current) searchRef.current.value = "";
            setSearch("");
        }
    },[])

    return (
        <div className="flex flex-col justify-start items-center">
            <h2 className="font-bold m-2">Gestor de Inventario</h2>
            <div>
                <input onChange={(e)=>{
                    setSearch(e.target.value);
                    handleSearchProduct(e.target.value)
                }} 
                ref={searchRef} type="text" placeholder="Busca un producto" className="border-1 border-gray-300 bg-gray-600 rounded-md p-1 placeholder-gray-400 mx-2 mb-3" />
            </div>
            <div>
                <input ref={inputRef} type="text" placeholder="Nombre del producto" className="border-1 border-gray-300 bg-gray-600 rounded-md p-1 placeholder-gray-400 mx-2" />
                <button onClick={handleAddProduct} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md mx-2 w-36">Agregar Producto</button> 
                <button onClick={handleEmptyInventary} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md mx-2 w-36">Vaciar Inventario</button> 
            </div>

            <ul>
                {(state.onSearch ? state.search : state.products).map((product) => (
                    <li key={product.id} className="flex justify-around m-5 items-center" >
                        <p className="mx-2">{product.name} - Cantidad: {product.quantity}</p>
                        <button onClick={() => handleIncrement(product.id)} className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md w-8 mx-2">+</button>
                        <button onClick={() => handleDecrement(product.id)}className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md w-8" >-</button>
                        <button onClick={() => handleRemove(product.id)}className="bg-gray-700 p-1 px-2 border-1 border-gray-400 rounded-md mx-2">Eliminar</button>
                    </li>
                ))
                }
            </ul>
        </div>
    );
}

