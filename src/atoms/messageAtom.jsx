import { atom } from "recoil";
const messageState = atom({
  key: "messageState", // unique ID (with respect to other atoms/selectors)
  default: "olá gostaria de conhecer seus produtos", // default value (aka initial value)
});

export { messageState };