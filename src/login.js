import "./scss/index.scss";
import {getElement} from "./utils";
import {getLogin, getRequestPassReset} from "./auth";

getElement('.js-cross').addEventListener('click', (e) => {
  e.preventDefault();
  getElement('[class*= "js-modal"]').classList.remove('is-visibility');
});

getElement('.js-login-submit').addEventListener('click', (e) => {
  e.preventDefault();
  getLogin();
})

getElement('.js-call-modal').addEventListener('click', (e) => {
  e.preventDefault();
  getRequestPassReset();
});
