import "./scss/main.scss";

import * as PIXI from "pixi.js";
import * as particles from "@pixi/particle-emitter";

import { getElement, getArrayElements } from "./utils";
import config from "./config";
import { giftsObjMobile, giftsObj, giftsInModal } from "./data/data";
import BaseRoomApp from "./BaseRoomApp";

const topValue = 160;
const widthMobileRoom = 400;
const heightTitleInModalGift = 104;
const paddingTopInModalGift = 88;
const paddingInnerInModalGift = 48;
const borderWidthInModalGift = 6;
const roomNumber = 1;
let isShiftRoom = false;
let timer1;
let timer2;
let valueTranslateX;
let valueTranslateY;

const availableWidth = document.documentElement.scrollWidth;
const availableHeight = document.documentElement.scrollHeight;

const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

class RoomApp extends BaseRoomApp {
  constructor() {
    super();

    this.state = Object.assign(this.state, {
      firstVisit: false,
      time1MS: 0,
      time2MS: 0,

      draggingGift: false,
      dragGift: null,
      draggingRoom: false,
      dragData: null,

      isMoveGift: null,

      isModal: false,

      scale: 1.2,

      isClickBoardingGift: false, // флаг щелчка на онбоардинге кнопки подарка в меню
      isClickBoardingLk: false, // флаг щелчка на онбоардинге кнопки ЛК в меню

      currentRoom: 1,
      newScale: 0, // Переменная для скейлинга в мобилке.
    });

    this.gifts = {};
    this.room = null;

    this.roomsList = getElement(".js-rooms");
    this.rooms = getArrayElements(".choice__item", this.elChoice);
    // this.elCurrentRoom = getElement(".js-current-room");
    this.elRange = getElement(".js-range");
    // this.arrButtonsRange = getArrayElements("[class *= 'js-range-button']");
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
    this.elBoardingRange = getElement(".js-onboarding-range");
    // this.elOnboardingContent = getElement(".js-onboarding-content");
    // this.elOnboardingContentGift = getElement(".js-onboarding-content-gift");
    // this.elOnboardingContentLk = getElement(".js-onboarding-content-lk");
    this.elOnboardingWrapperGift = getElement(".js-onboarding-wrapper-gift");
    this.elBoardingMenuGift = getElement(".js-onboarding-menu-gift");
    this.elBoardingLk = getElement(".js-onboarding-lk");
    this.elOnboardingGift = getElement(".js-onboarding-gift");
    this.elLinkSave = getElement(".js-link-save");

    this.modalGiftsContentMobile = 0;

    // this.resize = this.resize.bind(this);
    // this.initListeners();
    // this.setBlockGifts();
    // this.showSecondOnboarding();
    // this.callModallAr();
    // this.deleteGiftFromRoom();
    // this.setHeightModalWithGifts();
    // this.moveRoom();
    // this.styleFixes();
    // this.setNumberRoom();
    // this.setDefaultValueRoomRange();

    this.loader();
  }

  main() {
    // ЗДЕСЬ УСТАНАВЛИВАЕМ ФОН
    //

    // this.sprites.bg = new PIXI.Sprite(this.resources.bg.texture);
    // this.sprites.bg.anchor.set(0.5, 0);
    // this.sprites.bg.position.set(this.width / 2, 0);
    // this.sprites.bg.scale.set(
    //   Math.max(
    //     this.width / this.sprites.bg.width,
    //     this.height / this.sprites.bg.height,
    //   ),
    // );
    // this.stage.addChild(this.sprites.bg);

    // TEST
    const onSaveClick = () => {
      this.saveGifts();
    };

    this.sprites.btnSave = new PIXI.TilingSprite(
      this.resources.sprites.textures["pixel_green.png"],
      50,
      50,
    );
    this.sprites.btnSave.anchor.set(0, 0);
    this.sprites.btnSave.position.set(0, 0);
    this.sprites.btnSave.interactive = true;
    this.sprites.btnSave.buttonMode = true;
    this.sprites.btnSave.on("click", onSaveClick).on("tap", onSaveClick);
    this.stage.addChild(this.sprites.btnSave);
    //-------

    this.styleFixes();

    this.createRoom();
    this.initListeners();

    // setTimeout(() => {
    //   this.putGift(1);
    // }, 2000);
    //
    // setTimeout(() => {
    //   // this.removeGift(1);
    //   // this.clearRoom();
    // }, 10000);
    //
    // setInterval(() => {
    //   this.putGift(Object.keys(this.gifts).length + 1);
    // }, 5000);
  }

  createRoom() {
    if (this.room) {
      this.stage.removeChild(this.room);
      this.room = null;
    }

    this.room = new PIXI.Sprite(this.resources.room.texture);
    this.room.anchor.set(0.5, 0.5);
    this.room.position.set(this.width / 2, this.height / 2);
    this.room.scale.set(
      Math.min(this.width / this.room.width, this.height / this.room.height),
    );
    this.room.defaultScale = this.room.scale.x;
    this.room.interactive = true;
    this.stage.addChild(this.room);

    this.reScaleRoom();

    const onRoomDragStart = (e) => {
      this.state.dragData = e.data;

      // eslint-disable-next-line no-prototype-builtins
      if (e.target.hasOwnProperty("type") && e.target.type === "gift") {
        this.state.draggingGift = true;
        this.state.dragGift = e.target;
      }

      if (this.state.draggingGift === true) {
        return;
      }

      this.state.draggingRoom = true;
    };

    const onRoomDragMove = (e) => {
      if (this.state.draggingGift === true) {
        const newPosition = this.state.dragData.getLocalPosition(
          this.state.dragGift.parent,
        );

        //
        // console.log(
        //   newPosition.x,
        //   newPosition.y,
        //   this.state.dragGift.parent.width,
        //   this.state.dragGift.parent.height,
        // );

        if (
          newPosition.x <
            0 - this.state.dragGift.parent.width * devicePixelRatio ||
          newPosition.x > this.state.dragGift.parent.width * devicePixelRatio
        ) {
          return;
        }

        if (
          newPosition.y <
            0 - this.state.dragGift.parent.height * devicePixelRatio ||
          newPosition.y > this.state.dragGift.parent.height * devicePixelRatio
        ) {
          return;
        }

        this.state.dragGift.x = newPosition.x;
        this.state.dragGift.y = newPosition.y;

        return;
      }

      if (this.state.draggingRoom === true) {
        const newPosition = this.state.dragData.getLocalPosition(
          this.room.parent,
        );

        if (newPosition.x < 100 || newPosition > this.width - 100) {
          return;
        }

        if (newPosition.y < 100 || newPosition > this.height - 100) {
          return;
        }

        this.room.x = newPosition.x;
        this.room.y = newPosition.y;
      }
    };
    const onRoomDragEnd = (e) => {
      this.state.dragData = null;
      this.state.draggingRoom = false;
      this.state.draggingGift = false;
      this.state.dragGift = null;
    };

    this.room
      .on("pointerdown", onRoomDragStart)
      .on("pointerup", onRoomDragEnd)
      .on("pointerupoutside", onRoomDragEnd)
      .on("pointermove", onRoomDragMove);
  }

  removeGift(num = 1) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.gifts.hasOwnProperty(`gift${num}`)) {
      console.log("No gift with num", num);
      return;
    }

    this.room.removeChild(this.gifts[`gift${num}`]);
    delete this.gifts[`gift${num}`];

    console.log(this.gifts);
  }

  clearRoom() {
    const keys = Object.keys(this.gifts);
    keys.forEach((key) => {
      this.removeGift(`${key}`.replace("gift", ""));
    });

    console.log(this.gifts);
  }

  putGift(...args) {
    console.log(args);

    if (args.length === 0) {
      console.log("args length = 0");
      return;
    }

    if (giftsObj[0].length < args[0]) {
      console.log(
        "outer limit",
        giftsObj[this.state.currentRoom - 1].length,
        args[0],
      );
      return;
    }

    const data = giftsObj[this.state.currentRoom - 1][args[0]];

    const [
      num,
      x = data.x,
      y = data.y,
      scale = data.scale,
      rotation = data.rotation,
      name = null,
    ] = args;

    const spriteName = name === null ? `gift${num}` : name;

    // eslint-disable-next-line no-prototype-builtins
    if (this.gifts.hasOwnProperty(`gift${num}`)) {
      console.log("already created");
      return;
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!this.resources.gifts.textures.hasOwnProperty(`gift${num}.png`)) {
      console.log("no gift with num", num);
      return;
    }

    const g = new PIXI.Sprite(this.resources.gifts.textures[`gift${num}.png`]);
    g.anchor.set(0.5, 0.5);
    g.scale.set(scale);
    g.angle = rotation;
    g.position.set(x, y);

    g.num = num;
    g.name = spriteName;

    g.interactive = true;
    g.type = "gift";
    this.room.addChild(g);

    this.sprites[spriteName] = g;
    this.gifts[spriteName] = g;
  }

  spritesResize() {
    // if (this.sprites.bg) {
    //   this.sprites.bg.position.set(this.width / 2, 0);
    //   this.sprites.bg.scale.set(
    //     Math.max(
    //       this.width / this.sprites.bg.width,
    //       this.height / this.sprites.bg.height,
    //     ),
    //   );
    // }

    if (this.room) {
      this.stage.removeChild(this.room);
      this.room.removeChildren();
      this.room.destroy();
      this.room = null;
    }

    this.createRoom();

    const keys = Object.keys(this.gifts);
    keys.forEach((key) => {
      this.room.addChild(this.gifts[key]);
    });
  }

  //
  // resize() {
  //   this.setBlockGifts();
  //   this.setRoomInAllWindowMobile();
  // }

  setNumberRoom() {
    this.roomsList.classList.add(`room${roomNumber}`);
  }

  reScaleRoom() {
    if (!this.room) {
      return;
    }

    console.log(this.state.scale, this.elRange.value);

    if (this.state.scale < 1) {
      this.state.scale = 1;
    }

    if (this.state.scale > 2) {
      this.state.scale = 2;
    }

    this.room.scale.set(this.room.defaultScale * this.state.scale);
  }

  saveGifts() {
    const objToSave = [];
    const keys = Object.keys(this.gifts);
    keys.forEach((key) => {
      const g = this.gifts[key];
      objToSave.push({
        name: g.name,
        num: g.num,
        x: g.x,
        y: g.y,
        scale: g.scale.x,
        rotation: g.angle,
      });
    });

    console.log(JSON.stringify(objToSave));
  }

  loadGifts(data = []) {
    if (data.length === 0) {
      console.log("no data");
      return;
    }

    data.forEach(({ name, num, x, y, scale, rotation }) => {
      console.log(name, num, x, y, scale, rotation);
      this.putGift(num, x, y, scale, rotation, name);
    });
  }

  initListeners() {
    /**
     * Вешаем события на кнопки комнат
     */

    // Отключааем онбоардинги по клику
    // if (this.state.firstVisit) {
    //   this.elBoardingRange.addEventListener("click", () => {
    //     this.elBoardingRange.classList.remove("is-visibility");
    //     this.elBoardingMenuGift.classList.add("is-visibility");
    //     this.elMenu.classList.add("z-index-max");
    //   });
    //
    //   this.elBoardingMenuGift.addEventListener("click", () => {
    //     this.elBoardingMenuGift.classList.remove("is-visibility");
    //     this.elBoardingLk.classList.add("is-visibility");
    //     this.state.isClickBoardingGift = true;
    //   });
    //
    //   this.elBoardingLk.addEventListener("click", () => {
    //     this.elBoardingLk.classList.remove("is-visibility");
    //     this.elMenu.classList.remove("z-index-max");
    //     this.state.isClickBoardingLk = true;
    //   });
    // }

    // Изменение скейлинга по ползунку
    this.elRange.addEventListener("input", (e) => {
      this.state.scale = parseInt(e.target.value, 10) / 100;
      this.reScaleRoom();
    });

    const rangeBtnTop = getElement(".range-top");
    const rangeBtnBottom = getElement(".range-bottom");

    rangeBtnTop.addEventListener("click", () => {
      this.elRange.value = parseInt(this.elRange.value, 10) + 10;
      this.state.scale = parseInt(this.elRange.value, 10) / 100;

      this.reScaleRoom();
    });

    rangeBtnBottom.addEventListener("click", () => {
      this.elRange.value = parseInt(this.elRange.value, 10) - 10;
      this.state.scale = parseInt(this.elRange.value, 10) / 100;

      this.reScaleRoom();
    });

    this.arrButtonsCallModal.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        // Показ модалки
        this.arrModals[index].classList.add("is-visibility");
      });

      if (this.arrModals[index].classList.contains("js-modal-gifts")) {
        if (this.arrGiftsInModal.length === 0) {
          this.createBlockInModalGift();
        }
      }
    });

    // Нажатие на пункт Мои подарки в Модалке ЛК
    // this.elLinkGift.addEventListener("click", () => {
    //   if (this.arrGiftsInModal.length === 0) {
    //     this.createBlockInModalGift();
    //   }
    //   this.elModalLk.classList.remove("is-visibility");
    //   this.elModalGifts.classList.add("is-visibility");
    //   if (this.state.firstVisit) {
    //     this.elOnboardingGift.classList.add("is-visibility");
    //
    //     if (screen.width > 870) {
    //       this.elOnboardingWrapperGift.style.left = `${
    //         (availableWidth - this.elGifts.offsetWidth) / 2
    //       }px`;
    //       this.elOnboardingWrapperGift.style.top = `${
    //         (availableHeight - this.elGiftsContent.offsetHeight) / 2 + 40 + 6
    //       }px`;
    //     } else {
    //       this.elOnboardingWrapperGift.style.top = `${
    //         paddingTopInModalGift +
    //         heightTitleInModalGift +
    //         borderWidthInModalGift +
    //         paddingInnerInModalGift
    //       }px`;
    //       this.elOnboardingWrapperGift.style.left = `${
    //         (screen.width - this.elGiftsContent.offsetWidth) / 2 +
    //         paddingInnerInModalGift +
    //         borderWidthInModalGift
    //       }px`;
    //     }
    //     setTimeout(() => {
    //       this.showSecondOnboarding();
    //     }, 2500);
    //   }
    // });

    // Скрытие онбоардинга в модалке с подарками по нажатию
    // this.elOnboardingGift.addEventListener("click", () => {
    //   this.showSecondOnboarding();
    // });

    // Обработка нажатия на кнопку Сменить комнату
    // this.elLinkChoice.addEventListener("click", () => {
    //   this.elModalLk.classList.remove("is-visibility");
    //
    //   // Удалить все из комнаты и убрать в коробку
    //   const arrGifts = this.elCurrentRoom.childNodes;
    //   for (let i = arrGifts.length - 1; i >= 0; i--) {
    //     // Обратный порядок перебора массива, чтоб в массиве элементы по индексу не смещались
    //     arrGifts[i].remove();
    //   }
    //
    //   // При смене комнаты убираем в модалке подарков класс is-active у всех подарков
    //   for (let i = 0; i < this.arrGiftsInModal.length; i++) {
    //     if (this.arrGiftsInModal[i].nodeType === 1) {
    //       this.arrGiftsInModal[i].classList.remove("is-active");
    //     }
    //   }
    //
    //   this.elCallLkModal.classList.remove("is-hidden");
    //   this.elCallGiftModal.classList.add("is-hidden");
    //   this.setDefaultValueRoomRange();
    //   this.state.currentRoom = null;
    // });

    // Обработка нажатия на кнопку Подарки в меню
    // this.elCallGiftModal.addEventListener("click", () => {
    //   if (this.state.firstVisit) {
    //     this.elOnboardingGift.classList.add("is-visibility");
    //     this.elOnboardingWrapperGift.style.left = `${
    //       (availableWidth - this.elGifts.offsetWidth) / 2
    //     }px`;
    //     if (screen.width > 870) {
    //       this.elOnboardingWrapperGift.style.left = `${
    //         (availableWidth - this.elGifts.offsetWidth) / 2
    //       }px`;
    //       this.elOnboardingWrapperGift.style.top = `${
    //         (availableHeight - this.elGiftsContent.offsetHeight) / 2 + 40 + 6
    //       }px`;
    //     } else {
    //       this.elOnboardingWrapperGift.style.top = `${
    //         paddingTopInModalGift +
    //         heightTitleInModalGift +
    //         borderWidthInModalGift +
    //         paddingInnerInModalGift
    //       }px`;
    //       this.elOnboardingWrapperGift.style.left = `${
    //         (screen.width - this.elGiftsContent.offsetWidth) / 2 +
    //         paddingInnerInModalGift +
    //         borderWidthInModalGift
    //       }px`;
    //     }
    //     setTimeout(() => {
    //       this.showSecondOnboarding();
    //     }, 2500);
    //   }
    // });

    // Закрытие модалки по крестику
    this.arrCross.forEach((item) => {
      item.addEventListener("click", () => {
        item.parentNode.parentNode.classList.remove("is-visibility");
        this.elCallLkModal.classList.remove("is-hidden");
      });
    });

    // Обработка нажатия кнопки Сохранить
    // this.elLinkSave.addEventListener("click", () => {
    //   if (roomNumber && this.elCurrentRoom.childNodes.length !== 0) {
    //     const gifts = this.elCurrentRoom.childNodes;
    //     gifts.forEach((item) => {
    //       if (item.nodeType === 1) {
    //         const start =
    //           item.classList.toString().indexOf("gift gift") +
    //           "gift gift".length;
    //         const index = item.classList.toString().substr(start);
    //         if (window.screen.width <= config.size.mobile) {
    //           giftsObj[roomNumber - 1][index - 1].left = parseInt(
    //             item.style.left.substring(0, item.style.left.indexOf("px")),
    //             10,
    //           );
    //           giftsObj[roomNumber - 1][index - 1].top = parseInt(
    //             item.style.top.substring(0, item.style.top.indexOf("px")),
    //             10,
    //           );
    //         } else {
    //           giftsObjMobile[roomNumber - 1][index - 1].left = parseInt(
    //             item.style.left.substring(0, item.style.left.indexOf("px")),
    //             10,
    //           );
    //           giftsObjMobile[roomNumber - 1][index - 1].top = parseInt(
    //             item.style.top.substring(0, item.style.top.indexOf("px")),
    //             10,
    //           );
    //         }
    //       }
    //     });
    //     const toserver = JSON.stringify(giftsObj);
    //
    //     // this.gifts.push({
    //     //   element: HTMLElement,
    //     //   position: { x: 0, y: 0 },
    //     //   scale: 1,
    //     // });
    //
    //     // const toSave = [];
    //     // this.gifts.forEach((gift) => {
    //     //   toSave.push({ position: gift.position, scale: gift.scale });
    //     // });
    //     // JSON.stringify(toSave);
    //   }
    //   this.elModalLk.classList.remove("is-visibility");
    // });

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

  // Установка высоты модалки с подарками
  setHeightModalWithGifts() {
    if (screen.width <= 870) {
      const paddingBottom = 50;
      const valueHeight =
        screen.height -
        paddingTopInModalGift -
        heightTitleInModalGift -
        paddingBottom;
      this.elGiftsContent.style.height = `${valueHeight}px`;
      this.modalGiftsContentMobile =
        valueHeight - paddingInnerInModalGift * 2 - borderWidthInModalGift * 2;
      getElement(
        ".modal-gifts-content",
      ).style.height = `${this.modalGiftsContentMobile}px`;
    }
  }

  moveGift() {
    const elCurrentRoom = getElement(".js-current-room");
    const arrGifts = elCurrentRoom.childNodes;
    let scale = parseInt(getElement(".js-range").value, 10) / 100;
    let shiftXItem;
    let shiftYItem;
    let halfXItem;
    let halfYItem;
    let posMouseX;
    let posMouseY;
    let newLeft;
    let newTop;
    arrGifts.forEach((item) => {
      if (item.nodeType === 1) {
        // Функция которая подставляет подарок под курсорв
        function moveAt(pageX, pageY) {
          posMouseX = pageX;
          posMouseY = pageY;

          if (pageX <= elCurrentRoom.getBoundingClientRect().left + halfXItem) {
            newLeft = elCurrentRoom.getBoundingClientRect().left + shiftXItem;
          } else if (
            pageX >=
            elCurrentRoom.getBoundingClientRect().right - halfXItem
          ) {
            newLeft =
              elCurrentRoom.getBoundingClientRect().right -
              halfXItem * 2 +
              shiftXItem;
          } else {
            newLeft = pageX - halfXItem + shiftXItem;
          }

          if (pageY <= elCurrentRoom.getBoundingClientRect().top + halfYItem) {
            newTop = elCurrentRoom.getBoundingClientRect().top;
          } else if (
            pageY >=
            elCurrentRoom.getBoundingClientRect().bottom - halfYItem
          ) {
            newTop =
              elCurrentRoom.getBoundingClientRect().bottom -
              halfYItem * 2 +
              shiftYItem;
          } else {
            newTop = pageY - halfYItem + shiftYItem;
          }

          if (item.classList.contains("is-dragged")) {
            item.style.left = `${newLeft}px`;
            item.style.top = `${newTop}px`;
          }
        }
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
        item.addEventListener("pointerdown", function (event) {
          if (
            event.target.tagName !== "SPAN" &&
            this.classList.contains("gift")
          ) {
            event.stopPropagation();
            scale = parseInt(getElement(".js-range").value, 10) / 100; // коэффициент увеличения
            shiftXItem = (item.offsetWidth * scale - item.offsetWidth) / 2; // Насколько расширился элемент вправо и влево при scale
            shiftYItem = (item.offsetHeight * scale - item.offsetHeight) / 2; // Насколько расширился элемент вверх и вниз при scale
            halfXItem = (item.offsetWidth * scale) / 2; // Половина ширины элемента
            halfYItem = (item.offsetHeight * scale) / 2; // Половина высоты элемента
            document.body.append(item); // Элемент вытаскиваем из комнаты и вставляем в body
            item.classList.add("is-dragged");
            item.style.transform = `scale(${scale})`;
            const time1 = new Date();
            timer1 = time1.getTime();

            moveAt(event.pageX, event.pageY);
          }
        });

        item.addEventListener("pointerup", () => {
          item.style.transform = "scale(1)";
          if (
            posMouseX <=
            elCurrentRoom.getBoundingClientRect().left + halfXItem
          ) {
            item.style.left = "0px";
          } else {
            // console.log(parseInt(item.style.left, 10) + halfXItem, posMouseX);
            // console.log(elCurrentRoom.dataset.translatex);
            // console.log(
            //   item.style.left,
            //   item.style.top,
            //   elCurrentRoom.dataset.translatex,
            //   elCurrentRoom.dataset.translatey,
            //   posMouseX,
            //   Math.round(elCurrentRoom.getBoundingClientRect().left),
            //   scale,
            //   halfXItem,
            //   shiftXItem,
            //   parseInt(elCurrentRoom.dataset.translatex, 10),
            //   parseInt(elCurrentRoom.dataset.translatex, 10) * scale,
            // );

            // item.style.left = `${
            //   (posMouseX -
            //     Math.round(elCurrentRoom.getBoundingClientRect().left)) /
            //     scale -
            //   halfXItem +
            //   shiftXItem +
            //   parseInt(elCurrentRoom.dataset.translatex, 10)
            // }px`;

            const left = parseInt(item.style.left, 10);

            item.style.left = `${
              left +
              halfXItem +
              shiftXItem -
              parseInt(elCurrentRoom.dataset.translatex, 10)
            }px`;
          }

          item.style.top = `${
            (posMouseY -
              (availableHeight - elCurrentRoom.offsetHeight * scale) / 2) /
              scale -
            halfYItem +
            shiftYItem -
            parseInt(elCurrentRoom.dataset.translatey, 10)
          }px`;

          // const top = parseInt(item.style.top, 10);
          //
          // item.style.top = `${
          //   top +
          //   halfYItem +
          //   shiftYItem +
          //   parseInt(elCurrentRoom.dataset.translatey, 10)
          // }px`;

          elCurrentRoom.append(item);
          item.classList.remove("is-dragged");
          document.removeEventListener("mousemove", onMouseMove);
          const time2 = new Date();
          timer2 = time2.getTime();
          item.onmouseup = null;
        });

        document.addEventListener("pointermove", onMouseMove);
        item.ondragstart = function () {
          return false;
        };
      }
    });
  }

  moveRoom() {
    function moveAt(pageX, pageY) {
      const elCurrentRoom = getElement(".js-current-room");
      const elRange = getElement(".js-range");
      // Функция которая подставляет комнату под курсор;
      const scale = parseInt(elRange.value, 10) / 100;
      elCurrentRoom.removeAttribute("style");
      const shiftRoomX =
        (elCurrentRoom.offsetWidth - elCurrentRoom.offsetWidth * scale) / 2;
      const shiftRoomY =
        (elCurrentRoom.offsetHeight - elCurrentRoom.offsetHeight * scale) / 2;
      valueTranslateX = Math.round(
        pageX - (elCurrentRoom.offsetWidth * scale) / 2,
      );
      valueTranslateY = Math.round(
        pageY - (elCurrentRoom.offsetHeight * scale) / 2 - shiftRoomY * 2,
      );
      elCurrentRoom.setAttribute(
        "style",
        `margin: initial; transform: scale(${scale}) translate(${valueTranslateX}px,${valueTranslateY}px)`,
      );
      // elCurrentRoom.dataset.translatex = `${
      //   valueTranslateX +
      //   (elCurrentRoom.offsetWidth * scale) / 2 -
      //   window.innerWidth / 2
      // }`;

      elCurrentRoom.dataset.translatex = `${valueTranslateX}`;
      elCurrentRoom.dataset.translatey = `${valueTranslateY}`;

      // elCurrentRoom.dataset.translatey = `${
      //   valueTranslateY +
      //   (elCurrentRoom.offsetHeight * scale) / 2 -
      //   window.innerHeight / 2
      // }`;

      return `${valueTranslateX}, ${valueTranslateY}`;
    }
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      isShiftRoom = true;
    }
    this.elCurrentRoom.addEventListener("pointerdown", () => {
      if (
        (this.elCurrentRoom.offsetWidth * (Number(this.elRange.value) / 100) >
          availableWidth ||
          this.elCurrentRoom.offsetHeight * (Number(this.elRange.value) / 100) >
            availableHeight) &&
        String(this.classList).indexOf("current")
      ) {
        this.elCurrentRoom.addEventListener("pointermove", onMouseMove);
      }
    });
    this.elCurrentRoom.addEventListener("pointerup", () => {
      this.elCurrentRoom.removeEventListener("pointermove", onMouseMove);
      this.elCurrentRoom.onmouseup = null;
    });
    this.ondragstart = function () {
      return false;
    };
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

  // eslint-disable-next-line class-methods-use-this
  styleFixes() {
    const elBlockRange = getElement(".js-range").parentNode;

    if (!window.navigator.userAgent.includes("Fire")) {
      elBlockRange.style.width = `${
        getElement("body").offsetHeight - topValue * 2
      }px`; // всему блоку с ползунком присваиваем высоту подолжки модалки т.к. она всегда по высоте во весь экран
    } else {
      elBlockRange.classList.add("isMoz");
      elBlockRange.style.height = `${
        getElement("body").offsetHeight - topValue * 2
      }px`;

      // всему блоку с ползункои присваиваем высоту подолжки модалки т.к. она всегда по высоте во весь экран
      elBlockRange.style.top = `${
        (availableHeight - elBlockRange.offsetHeight) / 2
      }px`;
    }

    // this.setRoomInAllWindowMobile();
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

  getIndexElementFromCollection(el) {
    return `${el.parentNode.parentNode.className}`.substr("gift gift".length);
  }

  /**
   * Функция удаления подарка из комнаты, которая срабатывает на кнопке Удалить в коробку
   */
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
        giftsObjMobile[roomNumber - 1][num - 1].left
      }px; top:${giftsObjMobile[this.state.currentRoom - 1][num - 1].top}px`;
      styleValueImg = `transform: scale(${
        giftsObjMobile[roomNumber - 1][num - 1].scale
      }) rotate(${giftsObjMobile[roomNumber - 1][num - 1].rotate}deg)`;
    } else {
      styleValueDiv = `left:${giftsObj[roomNumber - 1][num - 1].left}px; top:${
        giftsObj[roomNumber - 1][num - 1].top
      }px`;
      styleValueImg = `transform: scale(${
        giftsObj[roomNumber - 1][num - 1].scale
      }) rotate(${giftsObj[roomNumber - 1][num - 1].rotate}deg)`;
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
      if (timer1 < 150) {
        // Проверка на то, что это именно щелчок ,а не нажатие и удрежание кнопки мыши
        const currentBlockButtons =
          e.target.parentElement.querySelector(".js-gift-buttons");
        const start = "gift gift".length;
        const currentNumberGift = e.target.parentElement.classList
          .toString()
          .substr(start);
        const excludeClass = `gift${currentNumberGift}`;
        const arrBlockButtons = getArrayElements(".js-gift-buttons");
        const _arrBlockButtons = arrBlockButtons;
        _arrBlockButtons.forEach((item, index) => {
          if (item.parentElement.classList.contains(excludeClass)) {
            _arrBlockButtons.splice(index, 1);
          }
        });
        for (const blockButtons of _arrBlockButtons) {
          blockButtons.classList.add("is-hidden");
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
        } else if (leftCoordGift <= currentBlockButtons.offsetWidth) {
          currentBlockButtons.style.left = "100%";
          currentBlockButtons.style.transformOrigin = "left";
        } else {
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
    elImg.addEventListener("pointerdown", showHideButtonsGift);
    const elShadow = document.createElement("div");
    const delBoarding = () => {
      if (this.state.firstVisit) {
        getElement(".onboarding-room").remove();
        getElement(".js-rooms-shadow").classList.add("is-hidden");
        this.state.firstVisit = false;
      }
    };
    elShadow.addEventListener("click", delBoarding);
    elShadow.classList.add("js-rooms-shadow");
    elShadow.classList.add("rooms-shadow");
    elDiv.append(elImg);
    elDiv.append(elButtons);
    elDiv.append(elShadow);
    getElement(".js-current-room").append(elDiv);
    getElement(".js-modal-gifts").classList.remove("is-visibility");
    // existencGift.isExist = true; // Подарок в комнате создан и переменная isExist получает true. Изначально она false

    this.callModallAr();
    this.deleteGiftFromRoom();
    this.moveGift();
    let timer = 0; // таймер показа тени под подарком. При первом визите он большой чтоб онбоардинг был виден, потом маленький
    if (this.state.firstVisit) {
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

  /**
   * Создание блоков для подарков в модалке подарков
   */
  createBlockInModalGift() {
    const elModal = getElement(".js-gifts");
    for (let i = 0; i < giftsInModal.length; i++) {
      const elGift = document.createElement("div");
      elGift.classList.add("gifts__item");
      elGift.dataset.id = i + 1;
      if (giftsInModal[i].class) {
        // если есть класс в объекте json
        elGift.classList.add(giftsInModal[i].class);
        elGift.addEventListener("click", () => {
          if (
            !elGift.classList.contains("is-active") &&
            elGift.classList.contains("is-can-get")
          ) {
            elGift.classList.add("is-active");
            this.putGift(i + 1);
            /**
             * ЗДЕСЬ ДОБАВЛЯЕМ ЗАКРЫТИЕ МОДАЛКИ
             */
            return;
            // this.createBlock(i + 1);
          }

          if (this.state.firstVisit) {
            const elDiv = document.createElement("div");
            const elContent = document.createElement("div");
            elDiv.setAttribute("class", "onboarding");
            elDiv.classList.add("onboarding-room");
            elDiv.classList.add("z-index-max");
            const isClickBoardingGiftRoom = () => {
              elDiv.remove();
              getElement(".js-rooms-shadow").classList.add("is-hidden");
              this.state.firstVisit = false;
            };
            elDiv.addEventListener("click", isClickBoardingGiftRoom);
            const elSpan = document.createElement("span");
            elSpan.textContent =
              "Кликни, чтобы перейти в ar или убрать в коробку";
            const elImg = document.createElement("img");
            elImg.src = "assets/images/finger2.svg";
            elContent.append(elSpan);
            elContent.append(elImg);
            elDiv.append(elContent);
            if (getElement(".gift1")) {
              getElement(".gift1").append(elDiv);
            }
            setTimeout(() => {
              if (this.state.firstVisit) {
                getElement(".onboarding-room").remove();
                getElement(".js-rooms-shadow").classList.add("is-hidden");
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
    this.elCurrentRoom.style = `transform: scale(1.2) translate(${
      window.screen.width / 2 -
      (this.elCurrentRoom.offsetWidth / 2) * this.state.scale
    }px,${
      window.screen.height / 2 -
      (this.elCurrentRoom.offsetHeight / 2) * this.state.scale
    }px)`; // margin: auto;

    this.elRange.value = "120";
  }

  // Показ-скрытие онбоардинга в модалке подарков
  showSecondOnboarding() {
    this.elOnboardingGift.classList.add("is-added");
    if (this.elOnboardingGift.classList.contains("is-added")) {
      setTimeout(() => {
        this.elOnboardingGift.classList.remove("is-visibility");
        this.elOnboardingGift.classList.remove("z-index-max");
        this.elOnboardingGift.classList.remove("is-added");
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
  const b = new RoomApp();
  if (!b) {
    throw new Error("App creation error");
  }
});
