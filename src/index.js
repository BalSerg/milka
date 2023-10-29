import "./scss/index.scss";

// import $ from "jquery";

import { getElement, getArrayElements, toggleModal } from "./utils";

import {getAuth, getRequestPassReset } from "./auth";

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
getElement('.js-cross').addEventListener('click', function () {
  getElement('[class*= "js-modal"]').classList.remove('is-visibility');
});

getElement('.auth-btn').addEventListener('click', function () {
  getAuth();
});

getElement('.request-reset-btn').addEventListener('click', function () {
  getRequestPassReset();
});
