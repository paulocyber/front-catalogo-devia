import { useEffect, useState } from "react";

import axios from "axios";
import { selector } from "recoil";

export const LoadProdutos = selector({
  key: "Products",
  get: async () => {
    try {
      const res = await axios(
        "https://api.catalogo.website/v1/api/products/catalogo?brand=devia&limit=150"
      );
      return res.data.content || [];
    } catch (error) {
      console.log(`Error: ${error}`);
      return [];
    }
  },
  // const [produtos, setProdutos] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://api.catalogo.website/v1/api/products/catalogo?brand=peining&limit=100"
  //     )
  //     .then((resp) => {
  //       // console.log("Deu certo a requisição", resp.data.content)
  //       setProdutos(resp.data.content);
  //     })
  //     .catch((err) => {
  //       //console.log("Deu certo a requisição",err)
  //     });
  // }, []);

  // // useEffect(() => {
  // //     setProdutos(Produtos);
  // // }, [produtos])

  // return produtos;
});

// useEffect(() => {
//     axios.get("https://api.catalogo.website/v1/api/products")
//     .then((resp) => {
//         console.log("Deu certo a requisição", resp.data)
//     })
//     .catch((err) => {
//         console.log("Deu certo a requisição",err)
//     })
// }, [])
