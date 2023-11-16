import React, { useEffect, useMemo, useState } from "react";

import "./ProductCard.css";

import Modal from "../Modal/Modal";
import ImagePop from "../PicModal/ImagePop";
import CalcInventory from "../Inventory/CalcInventory";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { messageState } from "../../atoms/messageAtom";
import { carrinhoAtom, quantidadeCarrinho } from "../../atoms/carrinhoAtom";
import QuantidadeProduct from "./QuantidadeProduct";
import { quantidadesPorProdutoState } from "../../atoms/quantidadesPorProdutoState";
import { formatCurrency } from "../utils/utils.common";

function ProductCard({ produtos, busca, setValorFinal, setValorFinalZap }) {
  const [produtoSelecionando, setProdutoSelecionando] = useState(null);
  // const [quantFinal, setQuantFinal] = useRecoilState(carrinhoQuantidade)
  const [quant, setQuant] = useState(1);
  const [message, setMessage] = useRecoilState(messageState);

  // Limpa campo de pesquisa para ele náo bugar quando for rederizado
  useEffect(() => {
    if (busca === "") {
    }
  }, [busca]);

  const produtsFiltradas = useMemo(() => {
    return produtos.filter((produto) =>
      produto.description.toLowerCase().includes(busca.toLowerCase())
    );
  }, [produtos, busca]);
  const [carrinhoState, setCarrinhoState] = useRecoilState(carrinhoAtom);
  const [quantidadesPorProduto, setQuantidadesPorProduto] = useRecoilState(
    quantidadesPorProdutoState
  );

  // adicionar produto no carrinho
  const addCartItem = (produto) => {
    setQuantidadesPorProduto((quantidades) => ({
      ...quantidades,
      [produto._id]: (quantidades[produto._id] || 0) + quant,
    }));
    setCarrinhoState((carrinhoState) => {
      const productExists = carrinhoState.findIndex(
        (item) => item._id === produto._id
      );
      if (productExists === -1) {
        const newCartItem = { _id: produto._id, quantidade: quant };
        //setQuantFinal([...quantFinal, newCartItem]);
        return [...carrinhoState, { ...produto, quantidade: quant }];
      } else {
        const novoCarrinho = [...carrinhoState];
        novoCarrinho[productExists] = {
          ...novoCarrinho[productExists],
          quantidade: novoCarrinho[productExists].quantidade + quant,
        };
        return novoCarrinho;
      }
    });
  };

  // Menssagem
  // const gerarMensagem = (carrinhoState) => {
  //   const mensagem = carrinhoState.map((item) => {
  //     return `${item?.description} - ${item?.quantidade} unid\n`;
  //   });
  //   setMessage(mensagem.join(''));
  // };

  useEffect(() => {
    console.log("Mensagem atualizada:", message);
  }, [message]);

  // Remove os produtos do carrinho

  const handleQuantidade = (novaQuantidade, produto) => {
    novaQuantidade = parseInt(novaQuantidade, 10);

    if (!isNaN(novaQuantidade)) {
      setCartProducts((cartProducts) => {
        const novoCarrinho = cartProducts.map((item) => {
          if (item._id === produto._id) {
            return { ...item, quantidade: novaQuantidade };
          }
          return item;
        });
        return novoCarrinho;
      });
    }
  };

  return (
    <div className="container">
      {produtsFiltradas.map((produto) => (
        <ProductItem
          key={produto._id}
          produto={produto}
          setProdutoSelecionando={setProdutoSelecionando}
          produtoSelecionando={produtoSelecionando}
          setValorFinal={setValorFinal}
          setValorFinalZap={setValorFinalZap}
          onAddCartItem={addCartItem}
          quant={quant}
          setQuant={setQuant}
          handleQuantidade={handleQuantidade}
          quantidadesPorProduto={quantidadesPorProduto}
        />
      ))}
    </div>
  );
}

function ProductItem({
  produto,
  setProdutoSelecionando,
  produtoSelecionando,
  setValorFinalZap,
  onAddCartItem,
  quant,
  setQuant,
  removeCarItem,
  //quantidadesPorProduto
}) {
  const [openModal, setOpenModal] = useState(false);
  const [addCar, setAddCar] = useState(false);
  const [valorFinal, setValorFinal] = useState();
  const [message, setMessage] = useRecoilState(messageState);
  const [showInput, setShowInput] = useState(false);

  const [quantFinal, setQuantFinal] = useRecoilState(quantidadeCarrinho);
  const [cartProducts, setCartProducts] = useRecoilState(carrinhoAtom);
  const [quantidadesPorProduto] = useRecoilState(quantidadesPorProdutoState);

  console.log("quantidade final: ", quantFinal);

  const handleClickProduto = () => {
    setProdutoSelecionando(produto);
    setOpenModal(true);
  };

  const handleClickAddCar = (produto, quantidade) => {
    // console.log("Adicionando ao carrinho...");
    // console.log("Carrinho", carrinhoState);
    const produtoNoCarrinho = carrinhoState.find(
      (item) => item.produto?._id === produto?._id
    );

    // if (produtoNoCarrinho) {
    //   // Se o produto já estiver no carrinho, atualize a quantidade
    //   console.log("Existe no carrinho");
    //   const carrinhoAtualizado = carrinhoState.map((item) =>
    //     item.produto?._id === produto?._id
    //       ? {
    //         ...item,
    //         quantidade: parseInt(item.quantidade) + parseInt(quantidade),
    //       }
    //       : item
    //   );
    //   setCarrinhoState(carrinhoAtualizado);
    // } else {
    //   // Se o produto não estiver no carrinho, adicione-o ao carrinho
    //   console.log("Nao esite produto Quantidade", quantidade);
    //   const novoItem = { produto, quantidade: parseInt(quantidade) };
    //   setCarrinhoState([...carrinhoState, novoItem]);
    // }

    // gerarMensagem(carrinhoState);
    // };
  };

  // const gerarMensagem = (carrinho) => {
  //   setMessage(
  //     carrinho.map((item) => {
  //       return `${item?.produto?.description} - ${item?.quantidade} unid\n`;
  //     })
  //   );
  // };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // const handleClickAddCarRemove = () => {
  //   if (addCar === false) {
  //     setAddCar(true);
  //   } else {
  //     setAddCar(false);
  //   }
  // };

  // const handleValorFinalChange = (newValue) => {
  //   setValorFinal(newValue);

  //   const descricao = produto.description;
  //   const valor = newValue;

  //   setValorFinalZap({ descricao, valor });
  // };

  // const handleQuantidadeChange = (newValue) => {
  //   console.log("handleQuantidadeChange", newValue);
  //   const quantidade = isNaN(newValue) ? 0 : newValue;
  //   handleClickAddCar(produto, quantidade);
  // };

  // função de soma
  const somaQuantidade = () => {
    setQuant(quant + 1);
  };

  const subtracaoQuantidade = () => {
    setQuant(quant - 1);
  };

  console.log("Quantidade do produto", quantidadesPorProduto)

  return (
    <>
      <div
        key={produto._id}
        className="product-card w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <button onClick={handleClickProduto}>
          <img className="p-8 rounded-t-lg" src={produto.urlImage} />
        </button>
        <div className="card_infos px-5 pb-5">
          <a href="#">
            <h5 className="descricao text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {produto.description}
            </h5>
          </a>
          <div className="container_card flex">
            <span className="valor">{formatCurrency(produto.value)}</span>
            <span className="info">ID:{produto.ref}</span>
            <span className="info">Cx: {produto.cx_und}</span>
          </div>
          <QuantidadeProduct
            showInput={showInput}
            setQuant={setQuant}
            produto={produto}
            quantProduto={quantidadesPorProduto[produto._id] || 0}
            quant={quant}
          />
          {/* <CalcInventory
            isOpen={addCar}
            produtoEstoque={produto.cx_und}
            produtoValor={produto.value}
            novoValor={handleValorFinalChange}
            novaStock={handleQuantidadeChange}
          /> */}
        </div>
        <button
          onClick={() => {
            onAddCartItem(produto);
            setShowInput(true);
          }}
          // id={`${addCar ? "button_car" : null}`}
          // onClick={handleClickAddCarRemove}
          //</div>className="button_car text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          className={`${
            !showInput
              ? "button_car text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              : "focus:outline-none font-bold text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm font px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          }`}>
          <span className="icon_car">
            <span>
              {!showInput
                ? "Adicionar ao carrinho"
                : "Adicionando ao carrinho!!"}
            </span>
            <ion-icon
              className="icon_addRemove"
              name={
                showInput ? "checkmark-outline" : "cart-outline"
              }></ion-icon>
          </span>
        </button>
      </div>
      <Modal
        key={produto.id}
        isOpen={openModal}
        setOpenModal={handleCloseModal}
        produto={produtoSelecionando}>
        <ImagePop produtoImagem={produto.urlImage} />
      </Modal>
    </>
  );
}

export default ProductCard;
