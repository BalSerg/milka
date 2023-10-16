import "./scss/main.scss";

import $ from "jquery";
import "slick-carousel";

import config from "./config";
import { getElement, getArrayElements } from "./utils";
import { giftsObjMobile, giftsObj, giftsInModal } from "./data/data";

let valueTranslateX;
let valueTranslateY;

const availableWidth = document.documentElement.scrollWidth;
const availableHeight = document.documentElement.scrollHeight;

// FIXME: вытащить в конфиг?
const topValue = 160;
const widthMobileRoom = 400;

class RoomsApp {
  constructor() {
    // super();

    this.state = {
      firstVisit: false,
      firstVisitNew: false,
      time1MS: 0,
      time2MS: 0,

      isMoveRoom: false,

      isModal: false,

      isClickBoardingGift: false,
      isClickBoardingLk: false,

      currentRoom: null,
      newScale: 0, // Переменная для скейлинга в мобилке.
    };

    this.setBlockGifts();

    // сброс к начальным значениям стилей комнаты и ползунка

    // Карусель в модалке
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
    this.roomsList = getElement(".js-rooms");
    this.rooms = getArrayElements(".choice__item", this.elChoice);
    this.elCurrentRoom = getElement(".js-current-room");
    this.elBlockRange = getElement(".js-range").parentNode;

    this.arrModals = getArrayElements('[class *= "js-modal"]');
    this.arrCross = getArrayElements(".js-cross");

    this.elBoardingMenuGift = getElement(".js-onboarding-menu-gift");
    this.elBoardingLk = getElement(".js-onboarding-lk");
    this.elBoardingRange = getElement(".js-onboarding-range");
    this.elRange = getElement(".js-range");

    this.roomContent = getElement(".room-content");

    this.resize = this.resize.bind(this);
    this.clickRoom = this.clickRoom.bind(this);

    this.initListeners();

    // Открытие-закрытие модалок
    // if (getElement('[class *= "js-modal"]')) {
    //   const arrButtonsCallModal = getArrayElements(
    //     '[class *= "js-call-modal"]',
    //   );
    //   const arrModals = getArrayElements('[class *= "js-modal"]');
    //
    //   arrButtonsCallModal.forEach((item, index) => {
    //     item.addEventListener("click", (e) => {
    //       if (e.target.classList.contains("js-call-lk-modal")) {
    //         getElement(".js-call-lk-modal").classList.add("is-hidden");
    //       }
    //
    //       if (arrModals[index].classList.contains("is-hidden")) {
    //         arrModals[index].classList.remove("is-hidden");
    //       }
    //
    //       if (!arrModals[index].classList.contains("is-visibility")) {
    //         arrModals[index].classList.add("is-visibility");
    //       }
    //       if (arrModals[index].classList.contains("js-modal-lk")) {
    //         const elLinkGift = getElement(".js-link-gift");
    //         const elLinkChoice = getElement(".js-link-choice");
    //
    //         if (!getElement(".js-choice").classList.contains("is-hidden")) {
    //           elLinkGift.classList.add("is-hidden");
    //         } else {
    //           elLinkGift.classList.remove("is-hidden");
    //         }
    //
    //         elLinkGift.addEventListener("click", () => {
    //           // Нажатие на пункт Мои подарки в Модалке ЛК
    //           if (getElement(".js-gifts").childNodes.length === 0) {
    //             createBlockInModslGift();
    //           }
    //           getElement(".js-modal-lk").classList.remove("is-visibility");
    //           getElement(".js-modal-gifts").classList.add("is-visibility");
    //         });
    //
    //         // Обработка нажатия на кнопку Сменить комнату
    //         elLinkChoice.addEventListener("click", () => {
    //           getElement(".js-modal-lk").classList.remove("is-visibility");
    //           getElement(".js-choice").classList.remove("is-hidden");
    //           getElement(".js-rooms").classList.add("is-hidden");
    //           getElement(".js-range").parentNode.classList.add("is-hidden");
    //
    //           // Убрать в меню выбор подарков и  показать в меню кнопку личного кабинета
    //           const arrMenuItems = getElement(".js-menu").childNodes;
    //           const arrItems = [];
    //           for (const jtem of arrMenuItems) {
    //             if (jtem.nodeType === 1) {
    //               arrItems.push(jtem);
    //             }
    //           }
    //           arrItems[0].classList.add("is-hidden"); // Кнопка подарки скрыта
    //           arrItems[1].classList.remove("is-hidden"); // Кнопак ЛК показана
    //
    //           // Удалить все из комнаты и убрать в коробку
    //           const arrGifts = getElement(".js-current-room").childNodes;
    //           for (let i = arrGifts.length - 1; i >= 0; i--) {
    //             // Обратный порядок перебора массива, чтоб в массиве элементы по индексу не смещались
    //             arrGifts[i].remove();
    //           }
    //           const arrGiftsInBox = getElement(".js-gifts").childNodes;
    //           for (let i = 0; i < arrGiftsInBox.length; i++) {
    //             if (
    //               arrGiftsInBox[i].nodeType === 1 &&
    //               arrGiftsInBox[i].classList.contains("is-active")
    //             ) {
    //               arrGiftsInBox[i].classList.remove("is-active");
    //             }
    //           }
    //           setDefaultValueRoomRange();
    //         });
    //       }
    //
    //       // Нажатие в меню кнопки Подарки
    //       if (
    //         e.target.parentNode.classList.contains("js-menu") &&
    //         !e.target.classList.contains("js-call-lk-modal")
    //       ) {
    //         if (getElement(".js-gifts").childNodes.length === 0) {
    //           createBlockInModslGift();
    //         }
    //
    //         if (getElement(".js-gift-buttons")) {
    //           // Скрываем блок кнопок околол подарка в комнате
    //           getArrayElements(".js-gift-buttons").forEach((item) => {
    //             if (!item.classList.contains("is-hidden")) {
    //               item.classList.add("is-hidden");
    //             }
    //           });
    //         }
    //
    //         if (first_visit) {
    //           // Показ онбоардингов на модалке подарков
    //           const elOnboardingGift = getElement(".js-onboarding-gift");
    //           elOnboardingGift.classList.add("is-visibility");
    //           elOnboardingGift.classList.add("z-index-max");
    //           const elOnboardingWrapperGift = getElement(
    //             ".js-onboarding-wrapper-gift",
    //           );
    //           elOnboardingWrapperGift.style.left = `${
    //             (availableWidth - getElement(".js-gifts").offsetWidth) / 2
    //           }px`;
    //           if (screen.width > 820) {
    //             elOnboardingWrapperGift.style.top = `${
    //               (availableHeight -
    //                 getElement(".js-gifts-content").offsetHeight) /
    //                 2 +
    //               40 +
    //               6
    //             }px`;
    //           } else {
    //             elOnboardingWrapperGift.style.top = `${
    //               (availableHeight -
    //                 getElement(".js-gifts-content").offsetHeight) /
    //                 2 +
    //               40 +
    //               6 +
    //               139
    //             }px`;
    //           }
    //           function showSecondOnboarding() {
    //             elOnboardingGift.classList.add("is-added");
    //             if (elOnboardingGift.classList.contains("is-added")) {
    //               setTimeout(() => {
    //                 elOnboardingGift.classList.remove("is-visibility");
    //                 elOnboardingGift.classList.remove("z-index-max");
    //                 elOnboardingGift.classList.remove("is-added");
    //               }, 1500);
    //             }
    //             return (first_visit = false);
    //           }
    //           elOnboardingGift.addEventListener("click", () => {
    //             showSecondOnboarding();
    //           });
    //           setTimeout(() => {
    //             showSecondOnboarding();
    //           }, 2500);
    //         }
    //       }
    //     });
    //   });
    //

    // }

    // Остлеживание изменения переменной isExist твечающей за наличие подарков в комнате и запуск нужных функций
    // const existencGift = { _isGift: false };
    // Object.defineProperty(existencGift, "isExist", {
    //   get() {
    //     return this._isGift;
    //   },
    //   set(value) {
    //     this._isGift = value;
    //     this.moveGift();
    //     this.deleteGiftFromRoom();
    //     this.callModallAr();
    //   },
    // });

    // Функция создает подарок в комнате используя данные из gifts[], параметр num - это номер текущей комнаты
    // if (getElement(".js-rooms")) {
    //   const elRoom = getElement(".js-rooms");
    //   let elMenu = getElement(".js-menu");
    //
    //   const elCurrentRoom = getElement(".js-current-room");
    //
    //   this.callOnboarding(".js-onboarding-choice", 2500);
    //
    //   const countRooms = 3;
    //
    //   // goRoom();
    //
    //   const elRange = getElement(".js-range");
    //   elCurrentRoom.style.transform = `scale(${
    //     parseInt(elRange.value, 10) / 100
    //   })`; // при загрузке сначала сразу ставим scale 1.2
    //

    //
    //   const arrButtons = getArrayElements("[class *= 'js-range-button']"); // нажатие на кнопки + -
    //   arrButtons.forEach((item) => {
    //     item.addEventListener("click", () => {
    //       let enlarger;
    //       let additionToEven;
    //       if (`${item.classList.toString()}`.includes("top")) {
    //         enlarger = 20;
    //         additionToEven = 1;
    //       } else {
    //         enlarger = -20;
    //         additionToEven = -1;
    //       }
    //
    //       if (elRange.value % 2 === 0) {
    //         elRange.value = Number(elRange.value) + enlarger;
    //       } else {
    //         elRange.value = Number(elRange.value) + enlarger + additionToEven;
    //       }
    //
    //       let start;
    //       if (elCurrentRoom.style.transform.indexOf("1") !== -1) {
    //         // Проверка на 1, потому что 2.1 быть не может
    //         start = elCurrentRoom.style.transform.indexOf("(1") + 1;
    //       } else {
    //         start = elCurrentRoom.style.transform.indexOf("(2") + 1;
    //       }
    //
    //       let valueScale;
    //       valueScale = elCurrentRoom.style.transform.substr(start, 3);
    //       if (valueScale.length < 3) {
    //         valueScale = elCurrentRoom.style.transform.substr(start, 1);
    //       }
    //       const cangedValueScale = valueScale * 100 + enlarger;
    //       if (cangedValueScale >= 100 && cangedValueScale <= 200) {
    //         if (this.state.isMoveRoom === true) {
    //           elCurrentRoom.style = `margin: initial; transform: scale(${
    //             elRange.value / 100
    //           }) translate(${valueTranslateX}px,${valueTranslateY}px)`;
    //         } else {
    //           elCurrentRoom.style.transform = `scale(${elRange.value / 100})`;
    //         }
    //       }
    //     });
    //   });

    // Обращаемся к блоку с подарками в модалке , собираем там все подарки в массив и по клику на элемента модалку закрываем,
    // куда кликнули ставим класс is-active и рисуем подарок в комнате
    //   const blockGifts = getElement(".js-gifts");
    //   const gifts = blockGifts.childNodes;
    //   const arrItems = [];
    //   for (const jtem of gifts) {
    //     if (jtem.nodeType === 1) {
    //       arrItems.push(jtem);
    //     }
    //   }
    //   arrItems.forEach((item, index) => {
    //     item.addEventListener("click", () => {
    //       if (
    //         item.classList.contains("is-can-get") &&
    //         !item.classList.contains("is-active")
    //       ) {
    //         item.classList.add("is-active");
    //         getElement(".js-modal-gifts").classList.remove("is-visibility");
    //         this.createBlock(index + 1);
    //         if (this.state.firstVisitNew) {
    //           const elDiv = document.createElement("div");
    //           const elContent = document.createElement("div");
    //           elDiv.setAttribute("class", "onboarding");
    //           elDiv.classList.add("onboarding-room");
    //           elDiv.classList.add("z-index-max");
    //           const elSpan = document.createElement("span");
    //           elSpan.textContent =
    //             "Кликни, чтобы перейти в ar или убрать в коробку";
    //           const elImg = document.createElement("img");
    //           elImg.src = "images/finger2.svg";
    //           elContent.append(elSpan);
    //           elContent.append(elImg);
    //           elDiv.append(elContent);
    //           if (elCurrentRoom.childNodes.length === 1) {
    //             elCurrentRoom.childNodes[0].append(elDiv);
    //           }
    //
    //           setTimeout(() => {
    //             elDiv.remove();
    //           }, 2500);
    //         }
    //       }
    //     });
    //   });
    // }
  }

  resize() {
    console.log("resize");
    this.setBlockGifts();
    this.setRoomInAllWindowMobile();
  }

  initListeners() {
    /**
     * RESIZE events
     */
    window.addEventListener("orientationchange", this.resize);
    window.addEventListener("resize", this.resize);
    //------------

    /**
     * Вешаем события на кнопки комнат
     */
    this.rooms.forEach((room) => {
      room.addEventListener("click", this.clickRoom);
    });

    this.elBoardingRange.addEventListener("click", () => {
      this.elBoardingRange.classList.remove("is-visibility");
      this.elBoardingMenuGift.classList.add("is-visibility");
      this.elMenu.classList.add("z-index-max");
    });

    this.elBoardingMenuGift.addEventListener("click", () => {
      this.elBoardingMenuGift.classList.remove("is-visibility");
      this.elBoardingLk.classList.add("is-visibility");
      this.state.isClickBoardingGift = true;
    });

    this.elBoardingLk.addEventListener("click", () => {
      this.elBoardingLk.classList.remove("is-visibility");
      this.elMenu.classList.remove("z-index-max");
      this.state.isClickBoardingLk = true;
    });

    this.elRange.addEventListener("input", () => {
      if (this.state.currentRoom === null) {
        return;
      }

      const scale = parseInt(this.elRange.value, 10) / 100;
      this.elCurrentRoom.style.transform = `scale(${scale})`;

      // Проверяем если есть смещение, то его добавляем в style
      if (this.state.isMoveRoom === true) {
        this.elCurrentRoom.style = `margin: initial; transform: scale(${
          parseInt(this.elRange.value, 10) / 100
        }) translate(${valueTranslateX}px,${valueTranslateY}px)`;
        this.elCurrentRoom.dataset.translatex = valueTranslateX;
        this.elCurrentRoom.dataset.translatey = valueTranslateY;
      } else {
        this.elCurrentRoom.style.transform = `margin: auto; scale(${
          parseInt(this.elRange.value, 10) / 100
        })`;
      }
    });

    /**
     * MODAL events
     */
    // Закрытие модалки по крестику
    this.arrCross.forEach((item) => {
      item.addEventListener("click", () => {
        item.parentNode.parentNode.classList.remove("is-visibility");

        // FIXME Это точно нельзя вытащить из цикла?
        getElement(".js-call-lk-modal").classList.remove("is-hidden");
      });
    });

    // Закрытие модалок по кнопке Esc
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

  clickRoom(e) {
    console.log(e);

    if (this.state.currentRoom !== null) {
      return;
    }

    const element = e.currentTarget;
    if (!("room" in element.dataset)) {
      return;
    }

    const { room } = element.dataset;
    console.log(room);
    this.state.currentRoom = room;

    this.elChoice.classList.add("is-hidden");

    const arrMenuItems = this.elMenu.childNodes; // показать в меню выбор подарков
    arrMenuItems.forEach((menuItem) => {
      if (menuItem.nodeType === 1) {
        menuItem.classList.remove("is-hidden");
      }
    });

    for (let i = 1; i <= this.rooms.length + 1; i++) {
      // Проверяем и удаляем заранее у комнаты все классы room1 room2 и т.д.
      if (this.roomsList.classList.contains(`room${i}`)) {
        this.roomsList.classList.remove(`room${i}`);
      }
    }

    this.elBlockRange.classList.remove("is-hidden"); // Показываем блок с полузнком

    this.roomsList.classList.remove("is-hidden");
    this.roomsList.classList.add(`room${room}`);
    this.roomsList.style.height = `${availableHeight}px`;

    this.styleFixes();

    if (window.screen.width <= 870) {
      this.elMenu.style.width = `${window.screen.height}px`;
    }

    this.elBoardingRange.classList.add("is-visibility");

    this.moveRoom();

    setTimeout(() => {
      this.elBoardingRange.classList.remove("is-visibility");
      if (this.state.isClickBoardingGift === false) {
        this.elBoardingMenuGift.classList.add("is-visibility");
        this.elMenu.classList.add("z-index-max");
      }
    }, 2500);

    setTimeout(() => {
      this.elBoardingMenuGift.classList.remove("is-visibility");
      if (this.state.isClickBoardingLk === false) {
        this.elBoardingLk.classList.add("is-visibility");
      }
    }, 5000);

    setTimeout(() => {
      this.elBoardingLk.classList.remove("is-visibility");
      this.elMenu.classList.remove("z-index-max");
    }, 7500);

    if (this.state.firstVisit) {
      this.elBlockRange.classList.add("z-index-max");
      setTimeout(() => {
        this.elBlockRange.classList.remove("z-index-max");
      }, 2500);

      if (window.screen.width > 820) {
        getElement(".js-onboarding-content").style.left = `${
          this.elBlockRange.getBoundingClientRect().x +
          this.elBlockRange.offsetHeight
        }px`;
        getElement(".js-onboarding-content").style.top = `${
          this.elBlockRange.getBoundingClientRect().y
        }px`;
        getElement(".js-onboarding-content-gift").style.left = `${
          this.elMenu.getBoundingClientRect().x - this.elMenu.offsetWidth
        }px`;
        getElement(".js-onboarding-content-gift").style.top = `${
          this.elMenu.getBoundingClientRect().y + this.elMenu.offsetHeight
        }px`;
        getElement(".js-onboarding-content-lk").style.left = `${
          this.elMenu.getBoundingClientRect().x - this.elMenu.offsetWidth / 4
        }px`;
        getElement(".js-onboarding-content-lk").style.top = `${
          this.elMenu.getBoundingClientRect().y + this.elMenu.offsetHeight + 50
        }px`;
      }
    }
  }

  styleFixes() {
    if (!window.navigator.userAgent.includes("Fire")) {
      this.elBlockRange.style.width = `${
        getElement("body").offsetHeight - topValue * 2
      }px`; // всему блоку с ползунком присваиваем высоту подолжки модалки т.к. она всегда по высоте во весь экран
    } else {
      this.elBlockRange.classList.add("isMoz");
      this.elBlockRange.style.height = `${
        getElement("body").offsetHeight - topValue * 2
      }px`; // всему блоку с ползункои присваиваем высоту подолжки модалки т.к. она всегда по высоте во весь экран
      this.elBlockRange.style.top = `${
        (availableHeight - this.elBlockRange.offsetHeight) / 2
      }px`;
    }
    this.setRoomInAllWindowMobile();
  }

  /**
   *  Функция движения комнаты
   */
  moveRoom() {
    // function moveAt(pageX, pageY) {
    //   // Функция которая подставляет комнату под курсор
    //   const scale = parseInt(elRange.value, 10) / 100;
    //   elCurrentRoom.removeAttribute("style");
    //   valueTranslateX = pageX - (elCurrentRoom.offsetWidth * scale) / 2;
    //   valueTranslateY = pageY - (elCurrentRoom.offsetHeight * scale) / 2;
    //   elCurrentRoom.setAttribute(
    //     "style",
    //     `margin: initial; transform: scale(${scale}) translate(${valueTranslateX}px,${valueTranslateY}px)`,
    //   );
    //   isMoveRoom = true;
    //   return `${valueTranslateX} ${valueTranslateY} ${isMoveRoom}`;
    // }
    // function onMouseMove(event) {
    //   moveAt(event.pageX, event.pageY);
    // }
    // elCurrentRoom.addEventListener("mousedown", function () {
    //   if (
    //     (elCurrentRoom.offsetWidth * (Number(elRange.value) / 100) >
    //       availableWidth ||
    //       elCurrentRoom.offsetHeight * (Number(elRange.value) / 100) >
    //       availableHeight) &&
    //     String(this.classList).indexOf("current")
    //   ) {
    //     elCurrentRoom.addEventListener("mousemove", onMouseMove);
    //   }
    // });
    // elCurrentRoom.addEventListener("mouseup", () => {
    //   elCurrentRoom.removeEventListener("mousemove", onMouseMove);
    //   elCurrentRoom.onmouseup = null;
    // });
    // this.ondragstart = function () {
    //   return false;
    // };
  }

  callOnboarding(selector, time) {
    if (this.state.firstVisit === false) {
      const elBoadring = getElement(selector);
      elBoadring.classList.add("is-visibility");

      elBoadring.addEventListener("click", () => {
        elBoadring.classList.remove("is-visibility");
      });

      setTimeout(() => {
        elBoadring.classList.remove("is-visibility");
      }, time);
    }
  }

  createBlock(num) {
    const elDiv = document.createElement("div");
    let styleValueDiv;
    let styleValueImg;
    if (window.screen.width <= config.size.mobile) {
      styleValueDiv = `left: ${
        giftsObj_mobile[numCurrentRoom - 1][num - 1].left
      }px; top:${giftsObj_mobile[numCurrentRoom - 1][num - 1].top}px`;
      styleValueImg = `transform: scale(${
        giftsObj_mobile[numCurrentRoom - 1][num - 1].scale
      }) rotate(${giftsObj_mobile[numCurrentRoom - 1][num - 1].rotate}deg)`;
    } else {
      styleValueDiv = `left:${
        giftsObj[numCurrentRoom - 1][num - 1].left
      }px; top:${giftsObj[numCurrentRoom - 1][num - 1].top}px`;
      styleValueImg = `transform: scale(${
        giftsObj[numCurrentRoom - 1][num - 1].scale
      }) rotate(${giftsObj[numCurrentRoom - 1][num - 1].rotate}deg)`;
    }
    elDiv.classList.add("gift");
    elDiv.classList.add(`gift${num}`);
    elDiv.classList.add("z-index-max");
    elDiv.setAttribute("style", styleValueDiv);

    const elButtons = document.createElement("ul");
    elButtons.classList.add("gift-buttons");
    elButtons.classList.add("js-gift-buttons");
    elButtons.classList.add("is-hidden");
    for (let i = 0; i < 2; i++) {
      const elLi = document.createElement("li");
      const elSpan = document.createElement("span");
      elLi.classList.add("gift-buttons__item");
      elLi.classList.add(config.contentButtonsForGift[1][i]);
      elLi.append(elSpan);
      elSpan.textContent = config.contentButtonsForGift[0][i];
      elButtons.append(elLi);
    }
    const elImg = document.createElement("img");
    elImg.setAttribute("style", styleValueImg);
    elImg.classList.add("js-img");
    elImg.src = `images/gifts/gift${num}.png`;
    const showHideButtonsGift = function () {
      if (this.state.time2_Ms - this.state.time1_Ms < 150) {
        // Проверка на то, что это именно щелчок ,а не нажатие и удрежание кнопки мыши
        const blockButtons = this.parentNode.querySelector(".js-gift-buttons");
        const start = "gift gift".length;
        const currentNumberGift = this.parentNode.classList
          .toString()
          .substr(start);
        const excludeClass = `gift${currentNumberGift}`;
        const arrBlockButtons = getArrayElements(".js-gift-buttons");
        arrBlockButtons.forEach((item) => {
          if (!item.parentNode.classList.contains(excludeClass)) {
            item.classList.add("is-hidden");
          }
          blockButtons.classList.toggle("is-hidden");
          blockButtons.removeAttribute("style");
          const leftCoordGift = Number(
            this.parentNode.style.left.substr(
              0,
              this.parentNode.style.left.indexOf("px"),
            ),
          );

          if (window.screen.width > config.size.mobile) {
            leftCoordGift >= blockButtons.offsetWidth
              ? (blockButtons.style.right = "100%")
              : (blockButtons.style.left = "100%");
          } else if (leftCoordGift <= blockButtons.offsetWidth) {
            blockButtons.style.left = "100%";
            blockButtons.style.transformOrigin = "left";
          } else {
            blockButtons.style.right = "100%";
            blockButtons.style.transformOrigin = "right";
          }
          const heightGift = Number(
            this.parentNode.style.top.substr(
              0,
              this.parentNode.style.top.indexOf("px"),
            ),
          );
          heightGift > 0
            ? (blockButtons.style.top = "0")
            : (blockButtons.style.bottom = "0");
        });
      }
    };
    elImg.addEventListener("click", showHideButtonsGift);
    const elShadow = document.createElement("div");
    elShadow.classList.add("js-rooms-shadow");
    elShadow.classList.add("rooms-shadow");
    elDiv.append(elImg);
    elDiv.append(elButtons);
    elDiv.append(elShadow);
    getElement(".js-current-room").append(elDiv);
    getElement(".js-modal-gifts").classList.remove("is-visibility");
    existencGift.isExist = true; // Подарок в комнате создан и переменная isExist получает true. Изначально она false

    let timer = 0; // таймер показа тени под подарком. При первом визите он большой чтоб онбоардинг был виден, потом маленький
    if (this.state.firstVisitNew) {
      timer = 2500;
    } else {
      timer = 800;
    }

    setTimeout(() => {
      elShadow.classList.add("is-hidden");
      elShadow.parentNode.classList.remove("z-index-max");
      this.state.firstVisitNew = false;
    }, timer);
  }

  moveGift() {
    const elCurrentRoom = getElement(".js-current-room");
    const arrGifts = elCurrentRoom.childNodes;
    let shiftXItem;
    let shiftYItem; // Смещение размеров подарка по горзионтали и вертикали из-за scale
    let halfWidthItem;
    let halfHeightItem; // Половина ширины и высоты подарка

    arrGifts.forEach((item) => {
      function moveAt(pageX, pageY) {
        // Функция которая подставляет подарок под курсор
        const scale = parseInt(getElement(".js-range").value, 10) / 100;
        halfWidthItem = (item.offsetWidth * scale) / 2;
        halfHeightItem = (item.offsetHeight * scale) / 2;
        shiftXItem = (item.offsetWidth * scale - item.offsetWidth) / 2;
        shiftYItem = (item.offsetHeight * scale - item.offsetHeight) / 2;

        if (this.state.isMoveRoom === true) {
          valueTranslateX = 0;
          valueTranslateY = 0;
        }

        console.log(pageX, Math.round(item.getBoundingClientRect().left));
        const newLeft =
          pageX -
          (availableWidth - elCurrentRoom.offsetWidth * scale) / 2 -
          shiftXItem -
          valueTranslateX;
        const newTop =
          pageY -
          (availableHeight - elCurrentRoom.offsetHeight * scale) / 2 -
          shiftYItem -
          valueTranslateY;

        if (newLeft <= 0) {
          item.style.left = `${0}px`;
        } else if (newLeft > 820 - item.offsetWidth) {
          item.style.left = `${820 - item.offsetWidth}px`;
        } else {
          item.style.left = `${newLeft}px`;
        }

        if (newTop <= 0) {
          item.style.top = `${0}px`;
        } else if (newTop > 820 - item.offsetHeight) {
          item.style.top = `${820 - item.offsetHeight}px`;
        } else {
          item.style.top = `${newTop}px`;
        }
      }
      function onMouseMove(event) {
        if (item.classList.contains("is-dragged")) {
          moveAt(event.pageX, event.pageY);
        }
      }

      item.addEventListener("mousedown", function (e) {
        for (const gift of arrGifts) {
          gift.classList.remove("is-dragged");
        }
        if (e.target.tagName !== "SPAN" && this.classList.contains("gift")) {
          e.stopPropagation();
          item.classList.add("is-dragged");
          elCurrentRoom.addEventListener("mousemove", onMouseMove);
        }
        const time1 = new Date();
        time1_Ms = time1.getTime();
        return time1_Ms;
      });
      item.addEventListener("mouseup", () => {
        item.classList.remove("is-dragged");
        item.removeEventListener("mousemove", onMouseMove);
        item.onmouseup = null;
        const time2 = new Date();
        time2_Ms = time2.getTime();
        return time2_Ms;
      });
      item.ondragstart = function () {
        return false;
      };
      document.documentElement.addEventListener("mouseup", () => {
        item.classList.remove("is-dragged");
        item.removeEventListener("mousemove", onMouseMove);
        item.onmouseup = null;
      });
    });
  }

  /**
   * Функция вызова модалки AR но только на десктопе. В других разрешениях не нужна эта модалка
   */
  callModallAr() {
    if (window.screen.width >= config.size.desktop) {
      getArrayElements(".js-call-ar").forEach((item) => {
        item.addEventListener("click", () => {
          const indexGift = this.getIndexElementFromCollection(item);
          getElement(
            ".js-qr-code",
          ).src = `images/qr-codes/qr-code${indexGift}.png`;
          getElement(".js-qr").classList.add("is-visibility");
        });
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getIndexElementFromCollection(el) {
    return `${el.parentNode.parentNode.className}`.substr("gift gift".length);
  }

  /**
   * Функция удаления подарка из комнаты, которая срабатывает на кнопке Удалить в коробку
   */
  // eslint-disable-next-line class-methods-use-this
  deleteGiftFromRoom() {
    getArrayElements(".js-del-gift").forEach((item) => {
      item.addEventListener("click", () => {
        item.parentNode.parentNode.remove();
        const indexGift = this.getIndexElementFromCollection(item);
        const tempGifts = getArrayElements(".gifts__item");
        tempGifts[indexGift - 1].classList.remove("is-active");
      });
    });
  }

  /**
   * Создание блоков для подарков в модалке подарков
   */
  createBlockInModalGift() {
    const elModal = getElement(".js-gifts");
    for (let i = 0; i < giftsInModal.length; i++) {
      const elGift = document.createElement("div");
      elGift.classList.add("gifts__item");
      if (giftsInModal[i].class) {
        // если есть класс в объекте json
        elGift.classList.add(giftsInModal[i].class);
        elGift.addEventListener("click", () => {
          this.createBlock(i + 1);
        });
      }
      const elImg = document.createElement("img");
      elImg.src = `images/gifts/${giftsInModal[i].src}.png`;
      const elSpan = document.createElement("span");
      elSpan.textContent = `${i + 1}`;
      elGift.append(elSpan);
      elGift.append(elImg);
      elModal.append(elGift);
    }
  }

  setDefaultValueRoomRange() {
    this.elCurrentRoom.style = "margin: auto; transform:scale(1.2)";
    this.elRange.value = "120";
  }

  // eslint-disable-next-line class-methods-use-this
  setRoomInAllWindowMobile() {
    if (window.screen.width <= 820 && window.screen.width > 400) {
      this.newScale = window.screen.width / widthMobileRoom;
      this.roomContent.style.transform = `scale(${this.newScale})`;
    } else {
      this.roomContent.removeAttribute("style");
    }
    return this.newScale;
  }

  /**
   * функция для равномерного выстраивания блоков с подарками в модалке подарков
   */
  // eslint-disable-next-line class-methods-use-this
  setBlockGifts() {
    if (!getElement(".js-gifts")) {
      return;
    }

    const elGifts = getElement(".js-gifts-content");
    elGifts.removeAttribute("style");
    const elWidth = 128;
    const margin = 32;
    const maxCount = 8;
    const borderWidth = 6;
    const scrollWidth = 4;
    let outerPadding = 48;
    let innerPadding = 40;
    if (window.screen.width <= 870) {
      outerPadding = 16;
      innerPadding = 48;
    }
    const availableWidthBlock = availableWidth - outerPadding * 2;
    const generalWidth =
      availableWidthBlock -
      innerPadding -
      (innerPadding - margin - scrollWidth) -
      borderWidth * 2;
    let countElements = Math.trunc(generalWidth / (elWidth + margin));
    if (countElements >= maxCount) {
      countElements = maxCount;
    }
    let newWidth;
    if (window.navigator.userAgent.indexOf("Fire")) {
      newWidth =
        margin * (countElements - 1) +
        countElements * elWidth +
        innerPadding * 2 +
        borderWidth * 2 +
        8;
    } else {
      newWidth =
        margin * (countElements - 1) +
        countElements * elWidth +
        innerPadding * 2 +
        borderWidth * 2 +
        scrollWidth;
    }
    elGifts.style.width = `${newWidth}px`;
  }

  // Функция перетаскивания подарков по комнате
  /* function moveGift() {
      let elCurrentRoom = getElement('.js-current-room');
      let arrGifts = elCurrentRoom.childNodes;
      const elRange = getElement('.js-range');
      let scale =  parseInt(getElement('.js-range').value, 10) / 100;
      let shiftXItem, shiftYItem ,halfXItem, halfYItem, posMouseX, posMouseY, newLeft, newTop, limiterLeft ,limiterRight, limiterTop, limiterBottom;
      arrGifts.forEach((item) => {
          item.addEventListener('mousedown', function (event){
              if(event.target.tagName !== 'SPAN' && this.classList.contains('gift')) {
                  event.stopPropagation();
                  document.body.append(item);//Элемент вытаскиваем из комнаты и вставляем в body
                  scale =  parseInt(getElement('.js-range').value, 10) / 100; // коэффициент увеличения
                  item.style.transform = `scale(${elRange.value/100})`;

                  //Всей комнате сбрасываем трансорфм и ставим размеры в рх с учетом scale
                  elCurrentRoom.style.transform = 'none';
                  elCurrentRoom.style.width = 820 * scale + 'px';
                  elCurrentRoom.style.height = 820 * scale + 'px';

                  //Так как сбросили трансформ то приподнимаем вверх комнату на половину от добавленной величины к высоте
                  elCurrentRoom.style.top = (availableHeight - elCurrentRoom.offsetHeight) / 2 + 'px';

                  //Так как сбросили трансформ то двигаем влево комнату на половину от добавленной величины к ширине
                  //elCurrentRoom.style.left = (document.documentElement.scrollWidth - elCurrentRoom.offsetWidth) / 2 + 'px';

                  moveAt(event.pageX, event.pageY);

                  // Функция которая подставляет подарок под курсорв
                  function moveAt(pageX, pageY) {
                      posMouseX = pageX;
                      posMouseY = pageY;
                      shiftXItem = (item.offsetWidth * scale - item.offsetWidth) / 2; //Насколько расширился элемент вправо и влево при scale
                      shiftYItem = (item.offsetHeight * scale - item.offsetHeight) / 2;//Насколько расширился элемент вверх и вниз при scale
                      halfXItem = item.offsetWidth * scale / 2; // Половина ширины элемента
                      halfYItem = item.offsetHeight * scale / 2;// Половина высоты элемента

                      limiterLeft = elCurrentRoom.getBoundingClientRect().left + halfXItem + shiftXItem;
                      limiterRight = elCurrentRoom.getBoundingClientRect().right - halfXItem - shiftXItem;
                      limiterTop = elCurrentRoom.getBoundingClientRect().top + halfYItem + shiftYItem;
                      limiterBottom = elCurrentRoom.getBoundingClientRect().bottom - halfYItem - shiftYItem;


                      newTop = pageY + shiftYItem// - halfYItem;
                      newLeft = pageX + shiftXItem //- halfXItem;
                      item.style.left = newLeft + 'px'
                      item.style.top = newTop + 'px';
                  }

                  function onMouseMove(event) {
                      moveAt(event.pageX, event.pageY);
                  }

                  document.addEventListener('mousemove', onMouseMove);

                  item.onmouseup = function(pageX, pageY) {
                      elCurrentRoom.append(item);
                      item.style.transform = 'scale(1)';
                      item.style.left = posMouseX - (availableWidth - elCurrentRoom.offsetWidth) / 2 + 'px';
                      item.style.top = posMouseY - (availableHeight - elCurrentRoom.offsetHeight) / 2 + 'px';

                      //Возвращаем координаты и размеры по умолчанию и scale
                      elCurrentRoom.style.width = 820 + 'px';
                      elCurrentRoom.style.height = 820 + 'px';
                      elCurrentRoom.style.top = 'initial';
                      elCurrentRoom.style.transform = `scale(${scale})`;
                      document.removeEventListener('mousemove', onMouseMove);
                      item.onmouseup = null;
                  };
              }
          })
          item.ondragstart = function () {
              return false;
          }
      })
  } */
}

window.addEventListener("load", () => {
  const a = new RoomsApp();
  if (!a) {
    throw new Error("App creation error");
  }
});
