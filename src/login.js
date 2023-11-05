import "./scss/index.scss";
import { getElement } from "./utils";

getElement(".js-call-modal").addEventListener("click", () => {
  getElement('[class*= "js-modal"]').classList.add("is-visibility");
});

getElement(".js-cross").addEventListener("click", () => {
  getElement('[class*= "js-modal"]').classList.remove("is-visibility");
});

// getElement('.js-login-submit').addEventListener('click', (e) => {
//   e.preventDefault();
//   window.location.href = 'rooms.html'
// })
