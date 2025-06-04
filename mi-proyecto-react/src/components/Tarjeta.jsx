function Tarjeta ({ titulo, descripcion, precio }) {
    return (
        <>
            <div class="md:w-3/4 text-color">
                <div class="max-w-4xl mx-auto md:flex">
                    <div class="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-2 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
                        <div class="w-full flex-grow">
                            <h2 class="text-center font-bold uppercase mb-4">{titulo} </h2>
                            <h3 class="text-center font-bold text-4xl mb-5">${precio} <span class="text-sm">/mo</span></h3>
                            <ul class="text-sm mb-8">
                                <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> {descripcion}</li>
                                <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> {descripcion}</li>
                            </ul>
                        </div>
                        <div class="w-full">
                            <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

/*function Tarjeta({ titulo, descripcion }) {
    return (
        <>
            <div className="max-w-sm p-4 m-2 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-black">{titulo}</h3>
                <p className="mt-1 text-gray-600">{descripcion}</p>
            </div>
        </>
    )
}
*/
export default Tarjeta;