import "./scss/index.scss";

// import $ from "jquery";

import { getElement, getArrayElements, toggleModal } from "./utils";

import {getAuth, getRequestPassReset } from "./auth";

// Показ формыы на странице index.html
const elForm = getElement(".js-form");
const elButtonLk = getElement(".js-go-lk");

elButtonLk.addEventListener("click", () => {
  elForm.classList.add("form-enter");
  elButtonLk.classList.add("is-hidden");
});

getElement('.js-cross').addEventListener('click', function () {
  getElement('[class*= "js-modal"]').classList.remove('is-visibility');
});

getElement('.auth-btn').addEventListener('click', function () {
  getAuth();
});

getElement('.request-reset-btn').addEventListener('click', function () {
  getRequestPassReset();
});
