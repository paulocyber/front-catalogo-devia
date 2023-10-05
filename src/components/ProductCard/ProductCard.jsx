import React, { useMemo } from "react";

import './ProductCard.css'
import { LoadProdutos } from "../utils/loadProdutos";

function ProductCard({ produtos, busca }) {

    const produtsFiltradas = useMemo(() => {
        return produtos.filter((produto) =>
        produto.description.toLowerCase().includes(busca.toLowerCase()));
    }, [produtos, busca]);
    
    return(
           
                <div className="container">
                    {produtsFiltradas.map((produto) => (
                        <div key={produto.id} className="product-card w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="p-8 rounded-t-lg" src={produto.urlImage}/>
                            </a>
                            <div className="card_infos px-5 pb-5">
                                <a href="#">
                                    <h5 className="descricao text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{produto.description}</h5>
                                </a>
                                <div className="container_card flex">
                                    <span className="valor">R${produto.value}</span>
                                    <span className="info">ID:{produto.ref}</span>
                                    {/* <span className="info">Estoque: 10</span> */}
                                    <span className="info">Cx: {produto.cx_und}</span>
                                    {/* <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">WhatApp</a> */}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

    );
}
export default ProductCard;