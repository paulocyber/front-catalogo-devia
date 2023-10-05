import React, { useState } from "react";

const CalcInventory = ({
  isOpen,
  produtoEstoque,
  produtoValor,
  novoValor,
  novaStock,
}) => {
  const [novaQuantidade, setNovaQuantidade] = useState();
  const [novoValue, setNovoValue] = useState(produtoValor);

  const handleQuantidadeChange = (e) => {
    const novaQuantidade = parseInt(e.target.value);
    const valorFinal = isNaN(novaQuantidade)
      ? produtoValor
      : produtoValor * novaQuantidade;
    setNovoValue(valorFinal);
    novoValor(valorFinal);
    novaStock(novaQuantidade);
  };

  // const estoqueDisponivel = isNaN(novaQuantidade) ? produtoStock : produtoStock - novaQuantidade;
  // const valorFinal = isNaN(novaQuantidade) ? produtoValor : produtoValor * novaQuantidade;
  if (isOpen) {
    return (
      <>
        {/* <span className="info">Estoque: {estoqueDisponivel}</span> */}

        <div id="title_car">
          <label
            htmlFor="visitors"
            className="descricao descricaoCar block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Quantidade:
          </label>
        </div>
        <input
          onChange={handleQuantidadeChange}
          value={novaQuantidade}
          // max={produtoStock}
          min={0}
          type="number"
          id="quantidade"
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required
        />
        {/* <span className="info">ValorFinal R$: {valorFinal}</span> */}
      </>
    );
  } else {
    return null;
  }
};

export default CalcInventory;