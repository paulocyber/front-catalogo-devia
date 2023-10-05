import { atom } from "recoil";
const carrinhoAtom = atom({
    key: "carrinhoAtom",
    default: [],
});

export { carrinhoAtom };