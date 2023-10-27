import "./scss/index.scss";

// import $ from "jquery";

import { getElement, getArrayElements } from "./utils";

// Показ формыы на странице index.html
//const elForm = getElement(".js-form");
const elButtonLk = getElement(".js-go-lk");

elButtonLk.addEventListener("click", () => {
  window.location.href = 'login.html';
});

getElement('.js-reg-submit').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'rooms.html'
})
