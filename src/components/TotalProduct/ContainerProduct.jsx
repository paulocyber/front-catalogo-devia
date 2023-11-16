// React
import React from 'react'

// Styles
import './css/styles.css'

// Componete
import { carrinhoAtom } from '../../atoms/carrinhoAtom'

// Biblioteca
import { useRecoilState } from 'recoil'

const ContainerProduct = ({ total }) => {
    const [cartProducts, setCartProducts] = useRecoilState(carrinhoAtom)

    return (
        <div className="mt-6 md:h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:-w-2/3">

            {/* <> */}
            {/* {
                    !cartProducts.length ? <p className='font-bold py-3'>Sem itens no carrinho</p>
                        : cartProducts.map((produto) =>
                        ( */}
            {/* <>
                <div key={produto._id} className="mb-2 flex items-center justify-between">
                    <p className="text-black font-bold md:text-sm">{produto.description}</p>
                    <p className="text-gray-700 font-semibold">R${produto.value}</p>
                </div>
                <hr className="my-4" /> */}
                {/* <div className="flex items-center justify-between">
                            <p className="text-black font-bold">WUP-959 POWER BANK 20000MAH PEINING</p>
                            <p className="text-gray-700 font-semibold">R$4.99</p>
                        </div> */}

            {/* </> */}

            {/* ))} */}

            {/* </> */}
            {/* <hr class="my-4" /> */}
            <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                    <p className="mb-1 text-lg font-bold">R$ {total} </p>
                </div>
            </div>
            <button className=" mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 inline-flex items-center justify-center">
                <span className='mr-5'>
                    Finalizar a compra
                </span>
                <ion-icon name="logo-whatsapp"></ion-icon>
            </button>
        </div>

    )
}

export default ContainerProduct