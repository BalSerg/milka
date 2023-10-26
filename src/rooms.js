import "./slick/slick.css";
import "./scss/main.scss";

import $ from "jquery";
import "slick-carousel";

import config from "./config";
import { getElement, getArrayElements } from "./utils";

// import {stat} from "copy-webpack-plugin/types/utils";

const availableWidth = document.documentElement.scrollWidth;
const availableHeight = document.documentElement.scrollHeight;

class RoomsApp {
  constructor() {
    // super();

    this.state = {
      firstVisit: false,
      firstVisitNew: false,

      isModal: false,
    };

    // Карусель
    $(".js-choice-slick").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      centerPadding: "24px",
      infinite: true,
    });

    this.elChoice = getElement(".js-choice");
    this.elMenu = getElement(".js-menu");
    this.arrModals = getArrayElements('[class *= "js-modal"]');
    this.arrButtonsCallModal = getArrayElements('[class *= "js-call-modal"]');
    this.arrCross = getArrayElements(".js-cross");
    this.elCallLkModal = getElement(".js-call-lk-modal");
    this.elModalLk = getElement(".js-modal-lk");
    this.elLinkChoice = getElement(".js-link-choice");
    this.elOnboardingChoice = getElement(".js-onboarding-choice");
    this.elLinkSave = getElement(".js-link-save");
    this.arrRooms = getArrayElements(".js-go-room");

    this.resize = this.resize.bind(this);

    this.initListeners();

    // Онбоардинг который появляется перед выбором комнаты
    if (this.state.firstVisit) {
      this.elOnboardingChoice.classList.add("is-visibility");

      setTimeout(() => {
        this.elOnboardingChoice.classList.remove("is-visibility");
      }, 2500);
    }
  }

  resize() {}

  initListeners() {
    /**
     * RESIZE events
     */
    window.addEventListener("orientationchange", this.resize);
    window.addEventListener("resize", this.resize);
    //------------

    // Переход в комнату
    this.arrRooms.forEach((item) => {
      item.addEventListener("click", () => {
        window.location.href = "room.html";
      });
    });

    // Отключааем онбоардинги по клику
    if (this.state.firstVisit) {
      this.elOnboardingChoice.addEventListener("click", () => {
        this.elOnboardingChoice.classList.remove("is-visibility");
      });
    }

    /**
     * MODAL events
     */
    this.arrButtonsCallModal.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        // Если нажали на копку ЛК НЕ в комнате!, то скрываем эту кнопку
        if (e.target.classList.contains("js-call-lk-modal")) {
          this.elCallLkModal.classList.add("is-hidden");
        }

        // Показ модалки
        this.arrModals[index].classList.add("is-visibility");
      });
    });

    // Обработка нажатия на кнопку Сменить комнату
    this.elLinkChoice.addEventListener("click", () => {
      this.elCallLkModal.classList.remove("is-hidden");
      this.elModalLk.classList.remove("is-visibility");
    });

    // Закрытие модалки по крестику
    this.arrCross.forEach((item) => {
      item.addEventListener("click", () => {
        item.parentNode.parentNode.classList.remove("is-visibility");
        this.elCallLkModal.classList.remove("is-hidden");
      });
    });

    // Обработка нажатия кнопки Сохранить
    this.elLinkSave.addEventListener("click", () => {
      this.elModalLk.classList.remove("is-visibility");
    });

    // Закрытие модалок по кнопке Escc
    window.addEventListener("keypress", (e) => {
      if (this.state.isModal === false) {
        return;
      }

      if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
        this.arrModals.forEach((item) => {
          item.classList.remove("is-visibility");
        });
      }
    });
    //---------
  }
}

window.addEventListener("load", () => {
  const a = new RoomsApp();
  if (!a) {
    throw new Error("App creation error");
  }
});
