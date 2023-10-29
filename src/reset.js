import "./scss/index.scss";
import {getElement} from "./utils";
import {getSaveNewPassword} from "./auth";

getElement('.js-cross').addEventListener('click', function () {
  getElement('[class*= "js-modal"]').classList.remove('is-visibility');
});

getElement('.btn-get-save-new-password').addEventListener('click', function () {
  getSaveNewPassword();
});
