import { atom, selector } from "recoil";

const carrinhoAtom = atom({
  key: "carrinhoAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const quantidadeCarrinho = selector({
  key: "quantidadeCarrinho",
  get: ({ get }) => {
    const carrinho = get(carrinhoAtom)
    const quantidades = carrinho.map((item) => item.quantidade)
    return quantidades
  }
})

export { carrinhoAtom, quantidadeCarrinho };
