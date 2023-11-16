// React
import React, { useEffect, useState } from "react";

// Biliotecas
import ReactWhatsapp from "react-whatsapp";
import { useRecoilValue } from "recoil";
import { messageState } from "./../../atoms/messageAtom";
import { Link } from "react-router-dom";

// Componentes
import Header from "./../../components/Header/Header";
import Banner from "./../../components/Banner/Banner";
import ProductCard from "./../../components/ProductCard/ProductCard";
import { LoadProdutos } from "./../../components/utils/loadProdutos";

// Imagens
import whatapp from "./../../assets/whatsapp.png";
import cart from "./../../assets/cart.png";

const Catalago = () => {
  const [busca, setBusca] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const produtos = useRecoilValue(LoadProdutos);

  const [mensagem, setMensagem] = useState("");
  const messageValue = useRecoilValue(messageState);

  console.log(`O valor do tal produto: ${mensagem}`);

  const [number, setNumber] = useState("(85) 9232-8282");

  useEffect(() => {
    // Atualize a mensagem sempre que os valores mudarem
    setMensagem(messageValue);
  }, [messageValue]);

  useEffect(() => {
    // Atualize a mensagem sempre que os valores mudarem
    setMensagem(messageValue);
  }, [messageValue]);

  useEffect(() => {
    const isPageReloaded = localStorage.getItem("isPageReloaded");
    /*if (!isPageReloaded) {
      localStorage.setItem('isPageReloaded', 'true') ;
    } else {
      localStorage.removeItem('isPageReloaded');
      document.querySelector('.content').classList.add('pulse-animation');
      document.querySelector('.card-container').classList.add('pulse-animation')
      ;
    }*/
  }, []);

  return (
    <div>
      <Header value={busca} onChange={(e) => setBusca(e.target.value)} />
      <div>
        <Banner />
      </div>
      {/* <div className="Carregadores">
        <h1>Produtos Peining</h1>
      </div> */}

      <div className="card-container">
        <React.Suspense fallback={<div> Loading...</div>}>
          <div>
            <ProductCard
              produtos={produtos}
              busca={busca}
              setValorFinalZap={(value) => {
                setDescricao(value.descricao);
                setValor(value.valor);
              }}
            />
          </div>
          {/* <ProductCard
            produtos={produtos}
            busca={busca}
            setValorFinalZap={(value) => {
              setDescricao(value.descricao);
              setValor(value.valor);
            }}
          /> */}
        </React.Suspense>

        {/* <div className="content">
          <div className="bg-white rounded-full flex items-center">
            <Link to='/cart' >
              <img className="w-1" src={carrinho} />
            </Link>
          </div>

          <ReactWhatsapp number="+558592328282" message="Olá, :) Estou interessado(a) em conhecer mais sobre os produtos que vocês oferece;">
            <img src={whatapp} alt="" />
          </ReactWhatsapp>

        </div>
      </div> */}
        <div className="content relative">
          <button
            className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-0 rounded-lg
                  mr-1 mb-5 lg:mr-2 lg:mb-5 xl:mr-10 xl:mb-10"
          >
            <div className="pb-5">
              <Link to={"/cart"}>
                <img src={cart} />
              </Link>
            </div>
            <div>
              <ReactWhatsapp
                number="+558592328282"
                message="Olá, :) Estou interessado(a) em conhecer mais sobre os produtos que vocês oferece;"
              >
                <img src={whatapp} alt="" />
              </ReactWhatsapp>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catalago;
