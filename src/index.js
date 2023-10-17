import "./scss/index.scss";

// import $ from "jquery";

import { getElement, getArrayElements } from "./utils";

// Показ формыы на странице index.html
const elForm = getElement(".js-form");
const elButtonLk = getElement(".js-go-lk");

elButtonLk.addEventListener("click", () => {
  elForm.classList.add("form-enter");
  elButtonLk.classList.add("is-hidden");
});

getElement('.js-call-modal').addEventListener('click', ()=> {
  getElement('[class*= "js-modal"]').classList.add('is-visibility');
})
getElement('.js-cross').addEventListener('click', function () {
  getElement('[class*= "js-modal"]').classList.remove('is-visibility');
})
