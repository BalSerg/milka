import "./slick/slick.css";
import "./scss/main.scss";

import $ from "jquery";
import "slick-carousel";

// import config from "./config";
import { getElement, getArrayElements } from "./utils";

// import {stat} from "copy-webpack-plugin/types/utils";

// const availableWidth = document.documentElement.scrollWidth;
// const availableHeight = document.documentElement.scrollHeight;

let language;

class RoomsApp {
  constructor() {
    // super();

    language = 'ru';
    switch (language) {
      case 'ru':
        getElement('.js-rooms-title').classList.add('font-ru');
        getArrayElements('[class *= "js-rooms-name"]').forEach((item) => {
          item.classList.add('font-ru');
        });
        getArrayElements('[class *= "js-rooms-text"]').forEach((item) => {
          item.classList.add('font-ru');
        });
        getArrayElements('.js-rooms-button').forEach((item) => {
          item.classList.add('font-ru');
        });
        getElement('.js-onboarding-choice-text').classList.add('font-ru');
        break;

      case 'kz':
        getElement('.js-rooms-title').classList.add('font-kz');
        getArrayElements('[class *= "js-rooms-name"]').forEach((item) => {
          item.classList.add('font-kz');
        });
        getArrayElements('[class *= "js-rooms-text"]').forEach((item) => {
          item.classList.add('font-kz');
        });
        getArrayElements('.js-rooms-button').forEach((item) => {
          item.classList.add('font-kz');
        });
        getElement('.js-onboarding-choice-text').classList.add('font-kz');
        break;

      case 'az':
        getElement('.js-rooms-title').classList.add('font-helvetica');
        getArrayElements('[class *= "js-rooms-name"]').forEach((item) => {
          item.classList.add('font-helvetica');
        });
        getArrayElements('[class *= "js-rooms-text"]').forEach((item) => {
          item.classList.add('font-helvetica');
        });
        getArrayElements('.js-rooms-button').forEach((item) => {
          item.classList.add('font-helvetica');
        });
        getElement('.js-onboarding-choice-text').classList.add('font-helvetica');
        break;

      case 'uz':
        getElement('.js-rooms-title').classList.add('font-uz');
        getArrayElements('[class *= "js-rooms-name"]').forEach((item) => {
          item.classList.add('font-uz');
        });
        getArrayElements('[class *= "js-rooms-text"]').forEach((item) => {
          item.classList.add('font-uz');
        });
        getArrayElements('.js-rooms-button').forEach((item) => {
          item.classList.add('font-uz');
        });
        getElement('.js-onboarding-choice-text').classList.add('font-uz');
        break;

      case 'kg':
        getElement('.js-rooms-title').classList.add('font-kz');
        getArrayElements('[class *= "js-rooms-name"]').forEach((item) => {
          item.classList.add('font-kz');
        });
        getArrayElements('[class *= "js-rooms-text"]').forEach((item) => {
          item.classList.add('font-kz');
        });
        getArrayElements('.js-rooms-button').forEach((item) => {
          item.classList.add('font-kz');
        });
        getElement('.js-onboarding-choice-text').classList.add('font-kz');
        break;

      case 'mn':
        getElement('.js-rooms-title').classList.add('font-kz');
        getArrayElements('[class *= "js-rooms-name"]').forEach((item) => {
          item.classList.add('font-kz');
        });
        getArrayElements('[class *= "js-rooms-text"]').forEach((item) => {
          item.classList.add('font-kz');
        });
        getArrayElements('.js-rooms-button').forEach((item) => {
          item.classList.add('font-kz');
        });
        getElement('.js-onboarding-choice-text').classList.add('font-kz');
        break;

      case 'ge':
        getElement('.js-rooms-title').classList.add('font-helvetica');
        getArrayElements('[class *= "js-rooms-name"]').forEach((item) => {
          item.classList.add('font-helvetica');
        });
        getArrayElements('[class *= "js-rooms-text"]').forEach((item) => {
          item.classList.add('font-helvetica');
        });
        getArrayElements('.js-rooms-button').forEach((item) => {
          item.classList.add('font-helvetica');
        });
        getElement('.js-onboarding-choice-text').classList.add('font-helvetica');
        break;

      case 'am':
        getElement('.js-rooms-title').classList.add('font-amGuard');
        getArrayElements('[class *= "js-rooms-name"]').forEach((item) => {
          item.classList.add('font-amGuard');
        });
        getArrayElements('[class *= "js-rooms-text"]').forEach((item) => {
          item.classList.add('font-amHelv');
        });
        getArrayElements('.js-rooms-button').forEach((item) => {
          item.classList.add('font-amGuard');
        });
        getElement('.js-onboarding-choice-text').classList.add('font-amHelv');
        break;
    }

    this.state = {
      firstVisit: true,

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
    // this.elMenu = getElement(".js-menu");
    // this.arrModals = getArrayElements('[class *= "js-modal"]');
    // this.arrButtonsCallModal = getArrayElements('[class *= "js-call-modal"]');
    // this.arrCross = getArrayElements(".js-cross");
    // this.elCallLkModal = getElement(".js-call-lk-modal");
    // this.elModalLk = getElement(".js-modal-lk");
    // this.elLinkChoice = getElement(".js-link-choice");
    this.elOnboardingChoice = getElement(".js-onboarding-choice");
    // this.elLinkSave = getElement(".js-link-save");
    this.arrRooms = getArrayElements(".js-go-room");
    this.arrMobileButtons = getArrayElements(".js-mobile-button");

    this.resize = this.resize.bind(this);

    this.setWidthMobileButton();

    this.initListeners();

    // Онбоардинг который появляется перед выбором комнаты
    if (this.state.firstVisit === true) {
      this.elOnboardingChoice.classList.add("is-visibility");

      setTimeout(() => {
        this.elOnboardingChoice.classList.remove("is-visibility");
      }, 2500);
    }
  }

  resize() {}

  setWidthMobileButton() {
    this.arrMobileButtons.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.style.width = `${
        this.arrRooms[this.arrRooms.length - 1].offsetWidth
      }px`;
    });
  }

  initListeners() {
    /**
     * RESIZE events
     */
    window.addEventListener("orientationchange", this.resize);
    window.addEventListener("resize", this.resize);
    //------------

    // Переход в комнату
    this.arrRooms.forEach((item, index) => {
      if (!("room" in item.dataset)) {
        return;
      }

      const { room } = item.dataset;

      item.addEventListener("click", () => {
        // window.location.href = `room.html?room=${index + 1}`;
        window.location.href = `/personal/room/${room}`;
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
    // this.arrButtonsCallModal.forEach((item, index) => {
    //   item.addEventListener("click", (e) => {
    //     // Если нажали на копку ЛК НЕ в комнате!, то скрываем эту кнопку
    //     if (e.target.classList.contains("js-call-lk-modal")) {
    //       this.elCallLkModal.classList.add("is-hidden");
    //     }
    //
    //     // Показ модалки
    //     this.arrModals[index].classList.add("is-visibility");
    //   });
    // });
    //
    // // Обработка нажатия на кнопку Сменить комнату
    // this.elLinkChoice.addEventListener("click", () => {
    //   this.elCallLkModal.classList.remove("is-hidden");
    //   this.elModalLk.classList.remove("is-visibility");
    // });
    //
    // // Закрытие модалки по крестику
    // this.arrCross.forEach((item) => {
    //   item.addEventListener("click", () => {
    //     item.parentNode.parentNode.classList.remove("is-visibility");
    //     this.elCallLkModal.classList.remove("is-hidden");
    //   });
    // });
    //
    // // Обработка нажатия кнопки Сохранить
    // this.elLinkSave.addEventListener("click", () => {
    //   this.elModalLk.classList.remove("is-visibility");
    //   this.elCallLkModal.classList.remove("is-hidden");
    // });
    //
    // // Закрытие модалок по кнопке Esc
    // window.addEventListener("keypress", (e) => {
    //   if (this.state.isModal === false) {
    //     return;
    //   }
    //
    //   if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
    //     this.arrModals.forEach((item) => {
    //       item.classList.remove("is-visibility");
    //     });
    //   }
    // });
    //---------
  }
}

window.addEventListener("load", () => {
  const a = new RoomsApp();
  if (!a) {
    throw new Error("App creation error");
  }
});
