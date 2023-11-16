import React from 'react'

// Rebail
import { carrinhoAtom } from '../../atoms/carrinhoAtom'
import { useRecoilState } from 'recoil'
import { quantidadesPorProdutoState } from '../../atoms/quantidadesPorProdutoState';

const QuantidadeProduct = ({ showInput, setQuant, produto, quant, quantProduto }) => {
    const [quantidadesPorProduto, setQuantidadesPorProduto] = useRecoilState(quantidadesPorProdutoState);
    const [carrinhoState, setCarrinhoState] = useRecoilState(carrinhoAtom);

    const handleInputChange = (event) => {
        const quantidadeNova = parseInt(event.target.value, 10) || 0;

        setQuantidadesPorProduto((prevQuantidadesPorProduto) => ({
            ...prevQuantidadesPorProduto,
            [produto._id]: quantidadeNova,
        }));

        setCarrinhoState((carrinhoState) => {
            const productExists = carrinhoState.findIndex((item) => item._id === produto._id);
            if (productExists === -1) {
                const newCartItem = { _id: produto._id, quantidade: quantidadeNova };
                return [...carrinhoState, { ...produto, quantidade: quantidadeNova }];
            } else {
                const novoCarrinho = [...carrinhoState];
                novoCarrinho[productExists] = {
                    ...novoCarrinho[productExists],
                    quantidade: quantidadeNova,
                };
                return novoCarrinho;
            }
        });
    };


    return (
        <div>
            {showInput && (
                <>

                    <div >
                        <span className="info">Quantidade: {quantProduto}</span>
                    </div>


                    <div className="flex items-center">
                        {/* <button
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover-text-blue-50"
                            onClick={decrementQuantidade}
                        >
                            -
                        </button> */}
                        <input
                            className="h-8 w-28 border bg-white text-center text-xs outline-none text-black font-bold"
                            type="number"
                            value={quantidadesPorProduto[produto._id] || 0}
                            onChange={handleInputChange}
                        />
                        {/* <button
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover-bg-blue-500 hover-text-blue-50"
                            onClick={incrementQuantidade}
                        >
                            +
                        </button> */}
                    </div>
                </>
            )}

            {/* {showInput && (
                <>
                    <div>
                        <span className="info">Quantidade: {quantidadesPorProduto}</span>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover-bg-blue-500 hover-text-blue-50"
                            onClick={() => setQuant(productQuantity - 1)}
                        >
                            -
                        </button>
                        <input
                            className="h-8 w-28 border bg-white text-center text-xs outline-none text-black font-bold"
                            type="number"
                            value={productQuantity}
                            readOnly
                        />
                        <button
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover-bg-blue-500 hover-text-blue-50"
                            onClick={() => setQuant(productQuantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </>
            )} */}
        </div>
    )
}

export default QuantidadeProduct