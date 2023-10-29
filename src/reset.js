import "./scss/index.scss";
import {getElement, toggleModal} from "./utils";
import {getSaveNewPassword} from "./auth";

getElement('.js-cross').addEventListener('click', () => {
  getElement('[class*= "js-modal"]').classList.remove('is-visibility');
});

getElement('.btn-get-save-new-password').addEventListener('click', function () {
  getSaveNewPassword();
});
