import "./slick/slick.css"
import "./scss/main.scss";

import $ from "jquery";
import "slick-carousel";

import config from "./config";
import { getElement, getArrayElements } from "./utils";
import { giftsObjMobile, giftsObj, giftsInModal } from "./data/data";
//import {stat} from "copy-webpack-plugin/types/utils";

let valueTranslateX;
let valueTranslateY;

const availableWidth = document.documentElement.scrollWidth;
const availableHeight = document.documentElement.scrollHeight;

// FIXME: вытащить в конфиг?
const topValue = 160;
const widthMobileRoom = 400;
const heightTitleInModalGift = 104;
const paddingTopInModalGift = 88;
const paddingInnerInModalGift = 48;
const borderWidthInModalGift = 6;

class RoomsApp {
  constructor() {
    // super();

    this.state = {

      firstVisit: false,
      firstVisitNew: false,
      time1MS: 0,
      time2MS: 0,

      isMoveRoom: false,
      movedRoom: null,

      isMoveGift: null,

      isModal: false,

      isClickBoardingGift: false,// флаг щелчка на онбоардинге кнопки подарка в меню
      isClickBoardingLk: false,// флаг щелчка на онбоардинге кнопки ЛК в меню

      currentRoom: null,
      newScale: 0, // Переменная для скейлинга в мобилке.
    };

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
    this.elRange = getElement(".js-range");
    this.elBlockRange = getElement(".js-range").parentNode;
    this.arrButtonsRange = getArrayElements("[class *= 'js-range-button']");

    this.arrModals = getArrayElements('[class *= "js-modal"]');
    this.arrButtonsCallModal = getArrayElements('[class *= "js-call-modal"]');
    this.arrCross = getArrayElements(".js-cross");
    this.elCallLkModal = getElement(".js-call-lk-modal");
    this.elCallGiftModal = getElement(".js-call-gift-modal");
    this.elModalLk = getElement(".js-modal-lk");
    this.elModalGifts = getElement(".js-modal-gifts");
    this.elLinkGift = getElement(".js-link-gift");
    this.elLinkChoice = getElement(".js-link-choice");
    this.elGifts = getElement(".js-gifts");
    this.elGiftsContent = getElement(".js-gifts-content");
    this.arrGiftsInModal = this.elGifts.childNodes;
    this.roomContent = getElement(".room-content");

    this.elBoardingMenuGift = getElement(".js-onboarding-menu-gift");
    this.elOnboardingGift = getElement('.js-onboarding-gift');
    this.elBoardingLk = getElement(".js-onboarding-lk");
    this.elBoardingRange = getElement(".js-onboarding-range");
    this.elOnboardingChoice = getElement('.js-onboarding-choice');
    this.elOnboardingContent = getElement('.js-onboarding-content');
    this.elOnboardingContentGift = getElement('.js-onboarding-content-gift');
    this.elOnboardingContentLk = getElement('.js-onboarding-content-lk');
    this.elOnboardingWrapperGift = getElement('.js-onboarding-wrapper-gift');
    this.elLinkSave = getElement('.js-link-save');

    this.modalGiftsContentMobile = 0;

    this.resize = this.resize.bind(this);
    this.clickRoom = this.clickRoom.bind(this);
    this.initListeners();
    this.setBlockGifts();
    this.setDefaultValueRoomRange();
    this.showSecondOnboarding();
    this.callModallAr();
    this.deleteGiftFromRoom();
    this.setHeightModalWithGifts();

    // Онбоардинг который появляется перед выбором комнаты
    if(this.state.firstVisit) {
      this.elOnboardingChoice.classList.add('is-visibility');

      setTimeout(()=> {
        this.elOnboardingChoice.classList.remove('is-visibility');
      }, 2500)
    }
  }

  resize() {
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

    // Отключааем онбоардинги по клику
    if(this.state.firstVisit) {
      this.elOnboardingChoice.addEventListener('click', () => {
        this.elOnboardingChoice.classList.remove('is-visibility');
      })

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
    }

    this.elRange.addEventListener("input", () => {
      if (this.state.currentRoom === null) {
        return;
      }

      const scale = parseInt(this.elRange.value, 10) / 100;
      this.elCurrentRoom.style.transform = `scale(${scale})`;
      this.elCurrentRoom.dataset.scale = `${scale}`;

      // Проверяем если есть смещение, то его добавляем в style
      if (this.state.isMoveRoom === true) {
        this.elCurrentRoom.style = `margin: initial; transform: scale(${scale}) translate(${valueTranslateX}px,${valueTranslateY}px)`;
        this.elCurrentRoom.dataset.translatex = valueTranslateX;
        this.elCurrentRoom.dataset.translatey = valueTranslateY;
      }
      else {
        this.elCurrentRoom.style.transform = `margin: auto; scale(${scale})`;
      }
    });

    // нажатие на кнопки + -
    this.arrButtonsRange.forEach((item) => {
      item.addEventListener("click", () => {
        let enlarger = 20;
        let additionToEven;
        let valueScale;
        const scale = parseInt(this.elRange.value, 10);
        valueScale = Math.trunc(scale / 10) * 10;//Сделано, чтоб на конце всегда был 0, например вместо 165 было 160
        if (`${item.classList.toString()}`.includes("top")) {
          additionToEven = 10;
          if(valueScale < 200) {
            valueScale += enlarger;
          }
        }
        else {
          additionToEven = -10;
          if(valueScale > 100) {
            valueScale -= enlarger;
          }
        }
        if (Math.trunc(scale / 10) % 2 === 0) {
          this.elRange.value = valueScale;
          this.elCurrentRoom.dataset.scale = (valueScale / 100).toString();
          this.elCurrentRoom.style.transform = `scale(${this.elCurrentRoom.dataset.scale})`;
        }
        else {
          this.elRange.value = valueScale + additionToEven;
          this.elCurrentRoom.dataset.scale = (this.elRange.value / 100).toString();
          this.elCurrentRoom.style.transform = `scale(${this.elCurrentRoom.dataset.scale})`;
        }
      });
    });

    /**
     * MODAL events
     */
    this.arrButtonsCallModal.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        // Если нажали на копку ЛК НЕ в комнате!, то скрываем эту кнопку
        if (
          e.target.classList.contains("js-call-lk-modal") &&
          !this.elChoice.classList.contains("is-hidden")
        ) {
          this.elCallLkModal.classList.add("is-hidden");
        }

        //Показ модалки
        this.arrModals[index].classList.add("is-visibility");

        if (this.arrModals[index].classList.contains("js-modal-gifts")) {
          if(this.arrGiftsInModal.length === 0) {
            this.createBlockInModalGift();
          }
        }

        if (this.arrModals[index].classList.contains("js-modal-lk")) {
          //если выбор из трех комнат НЕ скрыт, то в меню не показываем кнопку подарки, иначе показываем
          if (!this.elChoice.classList.contains("is-hidden")) {
            this.elLinkGift.classList.add("is-hidden");
          } else {
            this.elLinkGift.classList.remove("is-hidden");
          }
        }
      });
    });

    // Нажатие на пункт Мои подарки в Модалке ЛК
    this.elLinkGift.addEventListener("click", () => {
      if (this.arrGiftsInModal.length === 0) {
        this.createBlockInModalGift();
      }
      this.elModalLk.classList.remove("is-visibility");
      this.elModalGifts.classList.add("is-visibility");
      if(this.state.firstVisit) {
        this.elOnboardingGift.classList.add('is-visibility');

        if (screen.width > 870) {
          this.elOnboardingWrapperGift.style.left = (availableWidth - this.elGifts.offsetWidth) / 2 + 'px';
          this.elOnboardingWrapperGift.style.top = (availableHeight - this.elGiftsContent.offsetHeight) / 2 + 40 + 6 + 'px';
        }
        else {
          this.elOnboardingWrapperGift.style.top =  paddingTopInModalGift + heightTitleInModalGift + borderWidthInModalGift + paddingInnerInModalGift + 'px';
          this.elOnboardingWrapperGift.style.left = (screen.width -  this.elGiftsContent.offsetWidth) /2 + paddingInnerInModalGift + borderWidthInModalGift + 'px';
        }
        setTimeout(() => {
          this.showSecondOnboarding()
        },2500);
      }
    });

    // Скрытие онбоардинга в модалке с подарками по надатию
    this.elOnboardingGift.addEventListener('click', () => {
      this.showSecondOnboarding();
    })

    // Обработка нажатия на кнопку Сменить комнату
    this.elLinkChoice.addEventListener("click", () => {
      this.elModalLk.classList.remove("is-visibility");
      this.elChoice.classList.remove("is-hidden");
      this.roomsList.classList.add("is-hidden");
      this.elRange.parentNode.classList.add("is-hidden");

      // Убрать в меню выбор подарков и  показать в меню кнопку личного кабинета
      this.elCallGiftModal.classList.add("is-hidden"); // Кнопка подарки скрыта
      this.elCallLkModal.classList.remove("is-hidden"); // Кнопак ЛК показана

      // Удалить все из комнаты и убрать в коробку
      const arrGifts = this.elCurrentRoom.childNodes;
      for (let i = arrGifts.length - 1; i >= 0; i--) {
        // Обратный порядок перебора массива, чтоб в массиве элементы по индексу не смещались
        arrGifts[i].remove();
      }

      // При смене комнаты убираем в модалке подарков класс is-active у всех подарков
      for (let i = 0; i < this.arrGiftsInModal.length; i++) {
        if (this.arrGiftsInModal[i].nodeType === 1) {
          this.arrGiftsInModal[i].classList.remove("is-active");
        }
      }

      this.elCallLkModal.classList.remove("is-hidden");
      this.elCallGiftModal.classList.add("is-hidden");
      this.setDefaultValueRoomRange();
      this.state.currentRoom = null;
    });

    // Обработка нажатия на кнопку Подарки в меню
    this.elCallGiftModal.addEventListener('click', () => {
      if(this.state.firstVisit) {
        this.elOnboardingGift.classList.add('is-visibility');
        this.elOnboardingWrapperGift.style.left = (availableWidth - this.elGifts.offsetWidth) / 2 + 'px';
        if (screen.width > 870) {
          this.elOnboardingWrapperGift.style.left = (availableWidth - this.elGifts.offsetWidth) / 2 + 'px';
          this.elOnboardingWrapperGift.style.top = (availableHeight - this.elGiftsContent.offsetHeight) / 2 + 40 + 6 + 'px';
        }
        else {
          this.elOnboardingWrapperGift.style.top =  paddingTopInModalGift + heightTitleInModalGift + borderWidthInModalGift + paddingInnerInModalGift + 'px';
          this.elOnboardingWrapperGift.style.left = (screen.width -  this.elGiftsContent.offsetWidth) /2 + paddingInnerInModalGift + borderWidthInModalGift + 'px';
        }
        setTimeout(() => {
          this.showSecondOnboarding()
        },2500);
      }
    })

    // Закрытие модалки по крестику
    this.arrCross.forEach((item) => {
      item.addEventListener("click", () => {
        item.parentNode.parentNode.classList.remove("is-visibility");
        this.elCallLkModal.classList.remove("is-hidden");
      });
    });

    // Обработка нажатия кнопки Сохранить
    this.elLinkSave.addEventListener('click', () => {
      if(this.state.currentRoom && this.elCurrentRoom.childNodes.length !== 0) {
        const gifts = this.elCurrentRoom.childNodes
        gifts.forEach((item) => {
          if(item.nodeType === 1) {
            const start = item.classList.toString().indexOf('gift gift') + 'gift gift'.length;
            const index = item.classList.toString().substr(start);
            if (window.screen.width <= config.size.mobile) {
              giftsObj[this.state.currentRoom-1][index-1].left = parseInt(item.style.left.substring(0, item.style.left.indexOf('px')), 10);
              giftsObj[this.state.currentRoom-1][index-1].top = parseInt(item.style.top.substring(0, item.style.top.indexOf('px')), 10);
            }
            else {
              giftsObjMobile[this.state.currentRoom-1][index-1].left = parseInt(item.style.left.substring(0, item.style.left.indexOf('px')), 10);
              giftsObjMobile[this.state.currentRoom-1][index-1].top = parseInt(item.style.top.substring(0, item.style.top.indexOf('px')), 10);
            }
          }
        })
        const toserver = JSON.stringify(giftsObj);

        this.elModalLk.classList.remove('is-visibility');

        // this.gifts.push({
        //   element: HTMLElement,
        //   position: { x: 0, y: 0 },
        //   scale: 1,
        // });

        // const toSave = [];
        // this.gifts.forEach((gift) => {
        //   toSave.push({ position: gift.position, scale: gift.scale });
        // });
        // JSON.stringify(toSave);
      }
    })

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

    //Функция перетаскивания подарков по комнате

    /*
    this.elCurrentRoom.addEventListener("pointerout", (e) => {
      const element = e.target;

      if (!element.classList.contains("room-wrapper")) {
        return;
      }

      this.state.isMoveRoom = false;
      this.state.movedRoom = null;
      this.state.isMoveGift = null;
    });

    this.elCurrentRoom.addEventListener("pointerup", () => {
      const time2 = new Date;
      this.state.time2Ms = time2.getTime();
      this.state.movedRoom = null;
      this.state.isMoveGift = null;
      this.state.isMoveRoom = true;
    });

    this.elCurrentRoom.addEventListener("pointermove", (e) => {
      const {scale, translatex, translatey, coordXRoom, coordYRoom} = this.elCurrentRoom.dataset;

      if (this.state.isMoveGift === null) {
        if(this.state.movedRoom) {
          this.state.movedRoom.style.margin = 'initial';
          this.state.movedRoom.style.left = e.clientX - this.elCurrentRoom.offsetWidth/2 + 'px';//Math.round(e.clientX - Number(coordXRoom)) + 'px';
          this.state.movedRoom.style.top = e.clientY - this.elCurrentRoom.offsetHeight/2 + 'px';//Math.round(e.clientY - Number(coordYRoom)) + 'px';
        }
        else {
          return;
        }
        return;
      }
      else {
        if(this.state.movedRoom) {
          this.state.movedRoom.style.margin = 'initial';
          this.state.movedRoom.style.left = e.clientX - coordXRoom + 'px';
          this.state.movedRoom.style.top = e.clientY - coordYRoom + 'px';
        }
      }

      const buttons = getElement('.js-gift-buttons', e.target.parentElement);
      buttons.classList.add('is-hidden');

      const { coordX, coordY, offsetX, offsetY } =
        this.state.isMoveGift.dataset;

      // INFO: https://jsfiddle.net/laurence/YNMEX/
        console.log(coordX, e.clientX, offsetX);

        const left = parseInt(coordX, 10) + e.clientX - parseInt(offsetX, 10);
        const top = parseInt(coordY, 10) + e.clientY - parseInt(offsetY, 10);

        if(left < 0) {
          this.state.isMoveGift.parentElement.style.left = '0px'
        }
        else if(left > this.elCurrentRoom.offsetWidth - this.state.isMoveGift.parentElement.offsetWidth) {
          this.state.isMoveGift.parentElement.style.left = `${this.elCurrentRoom.offsetWidth - this.state.isMoveGift.parentElement.offsetWidth}px`
        }
        else {
          this.state.isMoveGift.parentElement.style.left = `${Math.round(left)}px`;
        }

        if(top < 0) {
          this.state.isMoveGift.parentElement.style.top = '0px'
        }
        else if(top > this.elCurrentRoom.offsetHeight - this.state.isMoveGift.parentElement.offsetHeight) {
          this.state.isMoveGift.parentElement.style.top = `${this.elCurrentRoom.offsetHeight - this.state.isMoveGift.parentElement.offsetHeight}px`
        }
        else {
          this.state.isMoveGift.parentElement.style.top = `${Math.round(top)}px`;
        }
    });

    this.elCurrentRoom.addEventListener("pointerdown", (e) => {
      const scale = Number(this.elCurrentRoom.dataset.scale);
      const time1 = new Date;
      this.state.time1Ms = time1.getTime();
      const element = e.target;
      if(e.target === e.currentTarget) {//Если нажали не на подарок
        this.state.movedRoom = this.elCurrentRoom;
        this.elCurrentRoom.dataset.coordXRoom = e.clientX;
        this.elCurrentRoom.dataset.coordYRoom = e.clientY;
      }
      if (element.parentElement.classList.contains("gift")) {
        this.state.isMoveGift = element;
        this.state.isMoveGift.classList.add("is-dragged");

        element.dataset.coordX = parseInt(element.parentElement.style.left, 10);
        element.dataset.coordY = parseInt(element.parentElement.style.top, 10);
        element.dataset.offsetX = e.clientX;
        element.dataset.offsetY = e.clientY;

        // FIXME это лучше вставить во все гифты при их добавлении
        this.state.isMoveGift.ondragstart = () => {
          e.preventDefault();
          return false;
        };
      } else {
        this.state.isMoveRoom = true;
      }
    });

     */
  }

  moveGift() {
    let elCurrentRoom = getElement('.js-current-room');
    let arrGifts = elCurrentRoom.childNodes;
    let scale =  parseInt(getElement('.js-range').value, 10) / 100;
    let shiftXItem, shiftYItem ,halfXItem, halfYItem, posMouseX, posMouseY, newLeft, newTop;
    arrGifts.forEach((item) => {
      if(item.nodeType === 1){
        item.addEventListener('mousedown', function (event){
          if(event.target.tagName !== 'SPAN' && this.classList.contains('gift')) {
            event.stopPropagation();
            scale =  parseInt(getElement('.js-range').value, 10) / 100; // коэффициент увеличения
            shiftXItem = (item.offsetWidth * scale - item.offsetWidth) / 2; //Насколько расширился элемент вправо и влево при scale
            shiftYItem = (item.offsetHeight * scale - item.offsetHeight) / 2;//Насколько расширился элемент вверх и вниз при scale
            halfXItem = item.offsetWidth * scale / 2; // Половина ширины элемента
            halfYItem = item.offsetHeight * scale / 2;// Половина высоты элемента
            document.body.append(item);//Элемент вытаскиваем из комнаты и вставляем в body
            item.style.transform = `scale(${scale})`;

            moveAt(event.pageX, event.pageY);

            // Функция которая подставляет подарок под курсорв
            function moveAt(pageX, pageY) {
              posMouseX = pageX;
              posMouseY = pageY;
              console.log(posMouseX);

              newTop = pageY - halfYItem + shiftYItem;
              newLeft = pageX - halfXItem + shiftXItem;

              item.style.left = newLeft + 'px'
              item.style.top = newTop + 'px';
            }

            function onMouseMove(event) {
              moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            item.onmouseup = function(pageX, pageY) {

              item.style.transform = 'scale(1)';
              console.log(posMouseX, availableWidth, elCurrentRoom.offsetWidth*scale, (availableWidth - elCurrentRoom.offsetWidth*scale)/2);
              item.style.left = (posMouseX - (availableWidth - elCurrentRoom.offsetWidth*scale)/2  ) / scale - halfXItem +  shiftXItem+ 'px';//
              item.style.top = (posMouseY - (availableHeight - elCurrentRoom.offsetHeight*scale)/2)  / scale - halfYItem + shiftYItem + 'px';//
              elCurrentRoom.append(item);
              document.removeEventListener('mousemove', onMouseMove);
              item.onmouseup = null;
            };
          }
        })
        item.ondragstart = function () {
          return false;
        }
      }
    })
  }

  // Установка высоты модалки с подарками
  setHeightModalWithGifts() {
    if(screen.width <= 870) {
      const paddingBottom = 50
      const valueHeight = screen.height - paddingTopInModalGift - heightTitleInModalGift - paddingBottom;
      this.elGiftsContent.style.height = valueHeight + 'px';
      this.modalGiftsContentMobile = valueHeight - paddingInnerInModalGift * 2 - borderWidthInModalGift * 2
      getElement('.modal-gifts-content').style.height = this.modalGiftsContentMobile + 'px';
    }
  }

  // Переход в команту
  clickRoom(e) {
    if (this.state.currentRoom !== null) {
      return;
    }

    const element = e.currentTarget;
    if (!("room" in element.dataset)) {
      return;
    }

    const { room } = element.dataset;
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
    if(screen.width <= 1100) {
      this.roomsList.style.height = `${screen.height}px`;
    }
    else {
      this.roomsList.style.height = `${availableHeight}px`;
    }


    this.styleFixes();
    if (window.screen.width <= 870) {
      this.elMenu.style.width = `${window.screen.height}px`;
    }

    if (this.state.firstVisit) {
      this.elBoardingRange.classList.add("is-visibility");
      this.elBlockRange.classList.add("z-index-max");
      setTimeout(() => {
        this.elBlockRange.classList.remove("z-index-max");
      }, 2500);

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

      if (window.screen.width > 820) {
        this.elOnboardingContent.style.left = `${
          this.elBlockRange.getBoundingClientRect().x +
          this.elBlockRange.offsetHeight
        }px`;
        this.elOnboardingContent.style.top = `${
          this.elBlockRange.getBoundingClientRect().y - this.elOnboardingContent.offsetHeight
        }px`;
        this.elOnboardingContentGift.style.left = `${
          this.elMenu.getBoundingClientRect().x - this.elMenu.offsetWidth
        }px`;
        this.elOnboardingContentGift.style.top = `${
          this.elMenu.getBoundingClientRect().y + this.elMenu.offsetHeight
        }px`;
        this.elOnboardingContentLk.style.left = `${
          this.elMenu.getBoundingClientRect().x - this.elMenu.offsetWidth / 4
        }px`;
        this.elOnboardingContentLk.style.top = `${
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
    }
    else {
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
          ).src = `assets/images/qr-codes/qr-code${indexGift}.png`;
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

  createBlock(num) {
    const elDiv = document.createElement("div");
    let styleValueDiv;
    let styleValueImg;
    if (window.screen.width <= config.size.mobile) {
      styleValueDiv = `left: ${
        giftsObjMobile[this.state.currentRoom - 1][num - 1].left
      }px; top:${giftsObjMobile[this.state.currentRoom - 1][num - 1].top}px`;
      styleValueImg = `transform: scale(${
        giftsObjMobile[this.state.currentRoom - 1][num - 1].scale
      }) rotate(${
        giftsObjMobile[this.state.currentRoom - 1][num - 1].rotate
      }deg)`;
    } else {
      styleValueDiv = `left:${
        giftsObj[this.state.currentRoom - 1][num - 1].left
      }px; top:${giftsObj[this.state.currentRoom - 1][num - 1].top}px`;
      styleValueImg = `transform: scale(${
        giftsObj[this.state.currentRoom - 1][num - 1].scale
      }) rotate(${giftsObj[this.state.currentRoom - 1][num - 1].rotate}deg)`;
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
    elImg.src = `assets/images/gifts/gift${num}.png`;
    const showHideButtonsGift = (e) => {
      if (this.state.time2Ms - this.state.time1Ms < 150) {// Проверка на то, что это именно щелчок ,а не нажатие и удрежание кнопки мыши
        const currentBlockButtons = e.target.parentElement.querySelector(".js-gift-buttons");
        const start = "gift gift".length;
        const currentNumberGift = e.target.parentElement.classList
          .toString()
          .substr(start);
        const excludeClass = `gift${currentNumberGift}`;
        const arrBlockButtons = getArrayElements(".js-gift-buttons");
        const _arrBlockButtons = arrBlockButtons;
        _arrBlockButtons.forEach((item,index) => {
          if(item.parentElement.classList.contains(excludeClass)){
            _arrBlockButtons.splice(index, 1)
          }
        })
        for(let blockButtons of _arrBlockButtons) {
          blockButtons.classList.add('is-hidden');
        }
        currentBlockButtons.classList.toggle("is-hidden");
        currentBlockButtons.removeAttribute("style");
        const leftCoordGift = Number(
          e.target.parentElement.style.left.substr(
            0,
            e.target.parentElement.style.left.indexOf("px"),
          ),
        );

        if (window.screen.width > config.size.mobile) {
          leftCoordGift >= currentBlockButtons.offsetWidth
            ? (currentBlockButtons.style.right = "100%")
            : (currentBlockButtons.style.left = "100%");
        }
        else if (leftCoordGift <= currentBlockButtons.offsetWidth) {
          currentBlockButtons.style.left = "100%";
          currentBlockButtons.style.transformOrigin = "left";
        }
        else {
          currentBlockButtons.style.right = "100%";
          currentBlockButtons.style.transformOrigin = "right";
        }
        const heightGift = Number(
          e.target.parentElement.style.top.substr(
            0,
            e.target.parentElement.style.top.indexOf("px"),
          ),
        );
        heightGift > 0
          ? (currentBlockButtons.style.top = "0")
          : (currentBlockButtons.style.bottom = "0");
      }
    };
    elImg.addEventListener("click", showHideButtonsGift);
    const elShadow = document.createElement("div");
    const delBoarding =  () => {
      if(this.state.firstVisit) {
        getElement('.onboarding-room').remove();
        getElement('.js-rooms-shadow').classList.add('is-hidden');
        this.state.firstVisit = false;
      }
    }
    elShadow.addEventListener('click', delBoarding);
    elShadow.classList.add("js-rooms-shadow");
    elShadow.classList.add("rooms-shadow");
    elDiv.append(elImg);
    elDiv.append(elButtons);
    elDiv.append(elShadow);
    getElement(".js-current-room").append(elDiv);
    getElement(".js-modal-gifts").classList.remove("is-visibility");
    //existencGift.isExist = true; // Подарок в комнате создан и переменная isExist получает true. Изначально она false
    this.moveGift();
    this.callModallAr();
    this.deleteGiftFromRoom();
    let timer = 0; // таймер показа тени под подарком. При первом визите он большой чтоб онбоардинг был виден, потом маленький
    if (this.state.firstVisit) {
      timer = 2500;
    }
    else {
      timer = 800;
    }

    setTimeout(() => {
      elShadow.classList.add("is-hidden");
      elShadow.parentNode.classList.remove("z-index-max");
      this.state.firstVisitNew = false;
    }, timer);
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
          if(!elGift.classList.contains('is-active') && elGift.classList.contains('is-can-get')){
            elGift.classList.add('is-active');
          }
          this.createBlock(i + 1);
          if (this.state.firstVisit) {
            const elDiv = document.createElement("div");
            const elContent = document.createElement("div");
            elDiv.setAttribute("class", "onboarding");
            elDiv.classList.add("onboarding-room");
            elDiv.classList.add("z-index-max");
            const isClickBoardingGiftRoom = () => {
              elDiv.remove();
              getElement('.js-rooms-shadow').classList.add('is-hidden');
              this.state.firstVisit = false;
            }
            elDiv.addEventListener('click', isClickBoardingGiftRoom)
            const elSpan = document.createElement("span");
            elSpan.textContent =
              "Кликни, чтобы перейти в ar или убрать в коробку";
            const elImg = document.createElement("img");
            elImg.src = "assets/images/finger2.svg";
            elContent.append(elSpan);
            elContent.append(elImg);
            elDiv.append(elContent);
            if (getElement('.gift1')) {
              getElement('.gift1').append(elDiv);
            }
            setTimeout(() => {
              if(this.state.firstVisit) {
                getElement('.onboarding-room').remove();
                getElement('.js-rooms-shadow').classList.add('is-hidden');
                this.state.firstVisit = false;
              }
            }, 2000);
          }
        });
      }
      const elImg = document.createElement("img");
      elImg.src = `assets/images/gifts/${giftsInModal[i].src}.png`;
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

  // Показ-скрытие онбоардинга в модалке подарков
  showSecondOnboarding() {
    this.elOnboardingGift.classList.add('is-added');
    if(this.elOnboardingGift.classList.contains('is-added')){
      setTimeout(() => {
        this.elOnboardingGift.classList.remove('is-visibility');
        this.elOnboardingGift.classList.remove('z-index-max');
        this.elOnboardingGift.classList.remove('is-added');
      }, 1500);
    }
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
}

window.addEventListener("load", () => {
  const a = new RoomsApp();
  if (!a) {
    throw new Error("App creation error");
  }
});
