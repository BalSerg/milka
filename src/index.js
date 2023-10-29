import "./scss/index.scss";

// import $ from "jquery";

import { getElement, getArrayElements, toggleModal } from "./utils";

import {getRegister} from "./auth";

// Показ формыы на странице index.html
//const elForm = getElement(".js-form");
const elButtonLk = getElement(".js-go-lk");

elButtonLk.addEventListener("click", () => {
  window.location.href = '/login';
});

getElement('.js-cross').addEventListener('click', (e) => {
  e.preventDefault();
  getElement('[class*= "js-modal"]').classList.remove('is-visibility');
});

getElement('.js-reg-submit').addEventListener('click', (e) => {
  e.preventDefault();
  getRegister();
});
