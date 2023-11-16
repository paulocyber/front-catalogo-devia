// React
import React, { useEffect, useState } from "react";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { carrinhoAtom } from "../../atoms/carrinhoAtom";
import { messageState } from "../../atoms/messageAtom";
import ReactWhatsapp from "react-whatsapp";
import { Link } from "react-router-dom";

// Componetes

const FinalizeCart = () => {
  const [cartProducts, setCartProducts] = useRecoilState(carrinhoAtom);
  const [message, setMessage] = useState("");
  const [quantidadeProduto, setQuantidadeProduto] = useState(0);

  const listaDeProdutos = useRecoilValue(carrinhoAtom);

  console.log("Os produtos que fora adicionandos no carrinho:", cartProducts);

  // Remove os produtos do carrinho
  const handleRemoveCarItem = (produtos) => {
    setCartProducts((cartProducts) =>
      cartProducts.filter((item) => item._id !== produtos._id)
    );
  };

  // Botões de soma de soma
  const handleSoma = (produto, newQuantity) => {
    setCartProducts((cartProducts) => {
      const productExists = cartProducts.findIndex(
        (item) => item._id === produto._id
      );
      if (productExists !== -1) {
        const novoCarrinho = [...cartProducts];
        novoCarrinho[productExists] = {
          ...novoCarrinho[productExists],
          quantidade: newQuantity,
        };
        return novoCarrinho;
      }
      return cartProducts;
    });
  };

  // Botões de soma de subtração
  const handleSubtracao = (produto, newQuantity) => {
    setCartProducts((cartProducts) => {
      const productExists = cartProducts.findIndex(
        (item) => item._id === produto._id
      );
      if (productExists !== -1) {
        const novoCarrinho = [...cartProducts];
        novoCarrinho[productExists] = {
          ...novoCarrinho[productExists],
          quantidade: newQuantity,
        };
        return novoCarrinho;
      }
      return cartProducts;
    });
  };

  const calcularValorTotal = (produto) => {
    return produto.quantidade * produto.value;
  };

  const formatarMensagem = (listaDeProdutos, totalCarrinho) => {
    const produtosFormatados = listaDeProdutos.map((produto) => {
      const descricao = produto.description.padEnd(45, " "); // Alinha o texto, preenchendo com espaços
      const valor = parseFloat(produto.value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const quantidade = produto.quantidade;

      return `${descricao} | Valor: ${valor} - Quantidade: ${quantidade}`;
    });

    const mensagemFinal = [
      "Olá, gostaria de conhecer os seguintes produtos:",
      ...produtosFormatados,
      `Valor Total: ${parseFloat(totalCarrinho).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`,
    ].join("\n");

    return mensagemFinal;
  };

  // Função para calcular o valor total dos produtos no carrinho
  const calcularValorTotalCarrinho = () => {
    let total = 0;
    cartProducts.forEach((produto) => {
      total += produto.quantidade * produto.value;
    });
    return total;
  };

  const totalCarrinho = calcularValorTotalCarrinho();

  useEffect(() => {
    setMessage(formatarMensagem(listaDeProdutos, totalCarrinho));
  }, [listaDeProdutos, totalCarrinho]);

  return (
    <>
      <div className="flex justify-center pt-4 w-full">
        <div className="flex items-center">
          <Link
            to="/"
            className="pb-4 font-semibold flex-row flex items-center"
          >
            <ion-icon name="caret-back-outline"></ion-icon>

            <p className="pl-2">Voltar para catálogo</p>
          </Link>
          <h1 className="mb-5 text-center text-2xl font-extrabold pl-5 pr-10">
            Cart Items
          </h1>
        </div>
        {/* <div className='flex items-start '>
                    <h1 className="pl-20 mb-5 mt-3 text-center text-2xl font-extrabold">Cart Items</h1>
                </div> */}
      </div>

      <div className="flex align-center justify-center flex-col w-full">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-bold text-black px-6 py-4 text-left "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-black px-6 py-4 text-left"
                    >
                      Descrição
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-black px-6 py-4 text-left"
                    >
                      Quantidade
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-black px-6 py-4 text-left"
                    >
                      Valor Unit
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-black px-6 py-4 text-left"
                    >
                      Valor Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!cartProducts.length
                    ? "No items"
                    : cartProducts.map((produto) => (
                        <tr
                          key={produto._id}
                          className="bg-gray-100 border-b w-1/5"
                        >
                          <td className="text-sm text-black-900 font-semibold px-6 py-4 md:whitespace-nowrap break-words">
                            {produto._id}
                          </td>
                          <td className="text-sm text-black-900 font-semibold px-6 py-4 md:whitespace-nowrap break-words">
                            {produto.description}
                          </td>
                          <td className="text-sm text-black-900 font-semibold px-6 py-4 whitespace-nowrap">
                            {/* <button
                                                            onClick={() => handleSubtracao(produto)}
                                                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                        >
                                                            -
                                                        </button> */}
                            <input
                              className="h-8 w-15 border bg-white text-center text-xs outline-none text-black font-bold"
                              type="number"
                              /* value={quant}
                                                             onChange={(e) => setQuanti(parseInt(e.target.value))}
                                                            value={produto.quantity}  Use quantity from the product
                                                            onChange={(e) => handleSoma(produto._id, parseInt(e.target.value))}
                                                            value={quant[produto._id] || 0}*/
                              value={produto.quantidade}
                              onChange={(e) =>
                                handleSoma(produto, parseInt(e.target.value))
                              }
                              /*onChange={(e) => {
                                                                const quantidadeTotal = parseInt(e.target.value);
                                                                setQuanti({ ...quant, [produto._id]: quantidadeTotal, [produto.value]: valorFinal });
                                                            }}*/
                              min="0"
                            />{" "}
                            {/* <button
                                                            onClick={() => handleSoma(produto)}
                                                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                        >
                                                            +
                                                        </button> */}
                          </td>
                          <td className="text-sm text-black-900 font-semibold px-6 py-4 md:whitespace-nowrap break-words">
                            R${produto.value}
                          </td>
                          <td className="items-center flex text-sm text-black-900 font-semibold px-6 py-4 md:whitespace-nowrap break-words">
                            R${calcularValorTotal(produto)}
                            <button
                              className="pl-5"
                              onClick={() => handleRemoveCarItem(produto)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6  rounded-lg border bg-white p-3 shadow-md md:mt-0 md:w-full">
              <div className="flex justify-between">
                <ReactWhatsapp number="+558592328282" message={message}>
                  <button
                    //onClick={() => handleEnviar()}
                    className="p-2 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 inline-flex items-center justify-center"
                  >
                    <span className="mr-5">Finalizar a compra</span>
                    <ion-icon name="logo-whatsapp"></ion-icon>
                  </button>
                </ReactWhatsapp>
                <div className="flex-row">
                  <p className="text-lg font-bold pr-0 md:pr-20">
                    Total R$ {totalCarrinho}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="container w-full">
    //     <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
    //         <thead className="text-white">
    //             <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
    //                 <th className="p-3 text-left">Name</th>
    //                 <th className="p-3 text-left">Email</th>
    //                 <th className="p-3 text-left" width="110px">Actions</th>
    //             </tr>
    //             <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
    //                 <th className="p-3 text-left">Name</th>
    //                 <th className="p-3 text-left">Email</th>
    //                 <th className="p-3 text-left" width="110px">Actions</th>
    //             </tr>
    //         </thead>
    //         <tbody className="flex-1 sm:flex-none">
    //             <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
    //                 <td className="border-grey-light border hover:bg-gray-100 p-3">John Covv</td>
    //                 <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">contato@johncovv.com</td>
    //                 <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
    //             </tr>
    //             <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
    //                 <td className="border-grey-light border hover:bg-gray-100 p-3">Michael Jackson</td>
    //                 <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">m_jackson@mail.com</td>
    //                 <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
    //             </tr>
    //         </tbody>
    //     </table>
    // </div>
    // <div classNameName="h-screen bg-gray-100 pt-20">
    //     <h1 className="mb-10 text-center text-2xl font-extrabold">Cart Items</h1>
    //     <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    //         {/* Mapeamento */}
    //         <div className="rounded-lg md:w-3/4">
    //             {
    //                 !cartProducts.length ? "No items"
    //                     : cartProducts.map((produto) =>
    //                         <div key={produto._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    //                             <img src={produto.urlImage} alt="product-image" class="w-full rounded-lg sm:w-40" />
    //                             <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
    //                                 <div className="mt-8 sm:mt-0">
    //                                     <h2 className="text-lg font-bold text-black-900">{produto.description}</h2>
    //                                     <p className="mt-1 text-xs font-semibold text-black-900">{produto._id}</p>
    //                                 </div>
    //                                 <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
    //                                     <div className="flex items-center border-gray-100">
    //                                         <button
    //                                             onClick={() => handleSubtracao(produto._id)}
    //                                             className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
    //                                         >
    //                                             -
    //                                         </button>

    //                                         <input
    //                                             className="h-8 w-11 border bg-white text-center text-xs outline-none text-black font-bold"
    //                                             type="number"
    //                                             /* value={quant}
    //                                              onChange={(e) => setQuanti(parseInt(e.target.value))}
    //                                             value={produto.quantity} // Use quantity from the product
    //                                             onChange={(e) => handleSoma(produto._id, parseInt(e.target.value))}*/
    //                                             value={quant[produto._id] || 0}
    //                                             onChange={(e) => {
    //                                                 const quantidadeTotal = parseInt(e.target.value);
    //                                                 setQuanti({...quant, [produto._id]: quantidadeTotal, [produto.value]: valorFinal });
    //                                             }}
    //                                             min="0"
    //                                         />

    //                                         <button
    //                                             onClick={() => handleSoma(produto._id, produto.value)}
    //                                             className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
    //                                         >
    //                                             +
    //                                         </button>
    //                                     </div>
    //                                     <div className="flex items-center space-x-3">
    //                                         <div>
    //                                             <span className='font-bold'>Valor total:</span>
    //                                             <p className="text-sm font-semibold text-red-900">R$R${produtoTotal[produto._id] || 0}</p>
    //                                         </div>
    //                                         <div>
    //                                             <span className='font-bold'>Valor unit:</span>
    //                                             <p className="text-sm font-bold text-red-900">R${produto.value}</p>
    //                                         </div>

    //                                         <button onClick={() => handleRemoveCarItem(produto)}>
    //                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
    //                                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    //                                             </svg>
    //                                         </button>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     )}
    //             <ContainerProduct total={calculoTotal()} />
    //         </div>
    //         {/* Total dos produtos */}

    //     </div >
    // </div >
  );
};

export default FinalizeCart;
