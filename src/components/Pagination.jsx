import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadProdutos } from "./utils/loadProducts";


const renderData = (currentItems) => {

  const produtos = LoadProdutos()
  console.log(produtos.length)

  return (
    <ul>
      {currentItems.map((produto) => {
        return (
            <>
                <img src={produto.urlImage}></img>
                <li key={produto.id}>{produto.description}</li>
            </>
        )
      })}
    </ul>
  );
};

function PaginationComponent() {
  //const [data, setData] = useState([]);
  //const [produtos, setProdutos] = useState([]);
  const produtos = LoadProdutos()

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(3);

  const [pageNumberLimit, setpageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(produtos.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = produtos.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  /*
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setProdutos(json));
  }, []);

  useEffect(() => {
    axios.get("https://api.catalogo.website/v1/api/products/catalogo?brand=peining")
    .then((resp) => {
        console.log("Deu certo a requisição", resp.data.content)
        setProdutos(resp.data.content);
    })
    .catch((err) => {
        console.log("Deu certo a requisição",err)
    })
}, [])*/

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
      <h1>Produtos Peining</h1> <br />
      {renderData(currentItems)}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button>
    </>
  );
}

export default PaginationComponent;