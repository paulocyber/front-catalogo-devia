import { useEffect, useState } from 'react';


import Produtos from '../../date/Produtos.json'
import axios from 'axios';

export const LoadProdutos = () => {

    const [produtos, setProdutos] = useState([]);
    useEffect(() => {
        axios.get(
            "https://api.catalogo.website/v1/api/products/catalogo?brand=devia"
        )
        .then((resp) => {
            console.log("Deu certo a requisição", resp.data.content)
            setProdutos(resp.data.content);
        })
        .catch((err) => {
            console.log("Deu certo a requisição",err)
        })
    }, [])

    // useEffect(() => {
    //     setProdutos(Produtos);
    // }, [produtos])

   return produtos;

   
   
}



// useEffect(() => {
//     axios.get("https://api.catalogo.website/v1/api/products")
//     .then((resp) => {
//         console.log("Deu certo a requisição", resp.data)
//     })
//     .catch((err) => {
//         console.log("Deu certo a requisição",err)
//     })
// }, [])