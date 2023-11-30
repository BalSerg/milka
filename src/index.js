import "./scss/index.scss";
import { getElement, getArrayElements } from "./utils";
// import $ from "jquery";

// import { getElement, getArrayElements } from "./utils";

// Показ формы на странице index.html
// const elForm = getElement(".js-form");
// const elButtonLk = getElement(".js-go-lk");

// elButtonLk.addEventListener("click", () => {
//   window.location.href = "login.html";
// });

// getElement('.js-reg-submit').addEventListener('click', (e) => {
//   e.preventDefault();
//   window.location.href = 'rooms.html'
// })

let language;

language = 'az';

switch (language) {
  case 'ru':
    getArrayElements('.js-form-name').forEach((item) => {
      item.classList.add('font-ru');
    });
    getArrayElements('.js-form-button').forEach((item) => {
      item.classList.add('font-ru');
    });
    break;

  case 'kz':
    getArrayElements('.js-form-name').forEach((item) => {
      item.classList.add('font-kz');
    });
    getArrayElements('.js-form-text').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-input').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-error').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-button').forEach((item) => {
      item.classList.add('font-kz');
    });
    break;

  case 'az':
    getArrayElements('.js-form-name').forEach((item) => {
      item.classList.add('font-appetite-helvetica');
    });
    getArrayElements('.js-form-text').forEach((item) => {
      item.classList.add('font-lifehack-helvetica');
    });
    getArrayElements('.js-form-input').forEach((item) => {
      item.classList.add('font-lifehack-helvetica');
    });
    getArrayElements('.js-form-error').forEach((item) => {
      item.classList.add('font-lifehack-helvetica');
    });
    getArrayElements('.js-form-button').forEach((item) => {
      item.classList.add('font-appetite-helvetica');
    });
    break;

  case 'uz':
    getArrayElements('.js-form-name').forEach((item) => {
      item.classList.add('font-uz');
    });
    getArrayElements('.js-form-text').forEach((item) => {
      item.classList.add('font-uz');
    });
    getArrayElements('.js-form-input').forEach((item) => {
      item.classList.add('font-uz');
    });
    getArrayElements('.js-form-error').forEach((item) => {
      item.classList.add('font-uz');
    });
    getArrayElements('.js-form-button').forEach((item) => {
      item.classList.add('uz');
    });
    break;

  case 'kg':
    getArrayElements('.js-form-name').forEach((item) => {
      item.classList.add('font-kz');
    });
    getArrayElements('.js-form-text').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-input').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-error').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-button').forEach((item) => {
      item.classList.add('font-kz');
    });
    break;

  case 'mn':
    getArrayElements('.js-form-name').forEach((item) => {
      item.classList.add('font-kz');
    });
    getArrayElements('.js-form-text').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-input').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-error').forEach((item) => {
      item.classList.add('font-lifehack-pacifico');
    });
    getArrayElements('.js-form-button').forEach((item) => {
      item.classList.add('font-kz');
    });
    break;

  case 'ge':
    getArrayElements('.js-form-name').forEach((item) => {
      item.classList.add('font-helvetica');
    });
    getArrayElements('.js-form-text').forEach((item) => {
      item.classList.add('font-helvetica');
    });
    getArrayElements('.js-form-input').forEach((item) => {
      item.classList.add('font-helvetica');
    });
    getArrayElements('.js-form-error').forEach((item) => {
      item.classList.add('font-helvetica');
    });
    getArrayElements('.js-form-button').forEach((item) => {
      item.classList.add('font-helvetica');
    });
    break;

  case 'am':
    getArrayElements('.js-form-name').forEach((item) => {
      item.classList.add('font-amGuard');
    });
    getArrayElements('.js-form-text').forEach((item) => {
      item.classList.add('font-amGuard');
    });
    getArrayElements('.js-form-input').forEach((item) => {
      item.classList.add('font-amGuard');
    });
    getArrayElements('.js-form-error').forEach((item) => {
      item.classList.add('font-amGuard');
    });
    getArrayElements('.js-form-button').forEach((item) => {
      item.classList.add('font-amGuard');
    });
    break;
}
