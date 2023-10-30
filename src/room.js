import "./scss/main.scss";

import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import * as particles from "@pixi/particle-emitter";

import { getElement, getArrayElements } from "./utils";
import config from "./config";
import giftsObj from "./data/data";
import BaseRoomApp from "./BaseRoomApp";

import giftParticles from "./giftParticles";

import roomNum from "./urlParams";

const topValue = 160;

const heightTitleInModalGift = 104;
const paddingTopInModalGift = 88;
const paddingInnerInModalGift = 32;
const borderWidthInModalGift = 6;

const availableWidth = document.documentElement.scrollWidth;
const availableHeight = document.documentElement.scrollHeight;

const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

class RoomApp extends BaseRoomApp {
  constructor() {
    super();

    this.state = Object.assign(this.state, {
      firstVisit: true,

      tutorials: {
        giftsModal: false,
      },

      draggingGift: false,
      dragGift: null,
      draggingRoom: false,
      dragData: null,

      isModal: false,

      scale: 1.2,

      isClickBoardingGift: false, // флаг щелчка на онбоардинге кнопки подарка в меню
      isClickBoardingLk: false, // флаг щелчка на онбоардинге кнопки ЛК в меню

      currentRoom: 1,
    });

    this.giftsInModal = window.giftsInModal || [];

    this.gifts = {};
    this.room = null;

    this.emitter = null;

    this.particleContainer = new PIXI.ParticleContainer(5000, {
      vertices: true,
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true,
    });
    this.renderGame = this.renderGame.bind(this);
    gsap.ticker.add(this.renderGame);

    this.roomsList = getElement(".js-rooms");
    this.rooms = getArrayElements(".choice__item", this.elChoice);
    this.elRange = getElement(".js-range");
    this.elBlockRange = this.elRange.parentNode;
    this.elMenu = getElement(".js-menu");
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
    this.elBoardingRange = getElement(".js-onboarding-range");
    this.elOnboardingContent = getElement(".js-onboarding-content");
    this.elOnboardingContentGift = getElement(".js-onboarding-content-gift");
    this.elOnboardingContentLk = getElement(".js-onboarding-content-lk");
    this.elOnboardingWrapperGift = getElement(".js-onboarding-wrapper-gift");
    this.elBoardingMenuGift = getElement(".js-onboarding-menu-gift");
    this.elBoardingLk = getElement(".js-onboarding-lk");
    this.elOnboardingGift = getElement(".js-onboarding-gift");
    this.elLinkSave = getElement(".js-link-save");

    // this.elLoader = getElement(".js-loader");

    this.modalGiftsContentMobile = 0;

    this.showTutorial();

    // this.resize = this.resize.bind(this);
    // this.initListeners();
    // this.setBlockGifts();
    // this.showSecondOnboarding();
    // this.callModallAr();
    // this.deleteGiftFromRoom();
    this.setHeightModalWithGifts();
    // this.moveRoom();
    // this.styleFixes();
    // this.setNumberRoom();
    // this.setDefaultValueRoomRange();
    // if (this.emitter !== null) {
    //   this.emitter.update(deltaTime * 0.001);
    // }
    this.loader();
  }

  createEmitter() {
    this.emitter = new particles.Emitter(
      this.particleContainer,
      particles.upgradeConfig(giftParticles, [this.resources.snow.texture]),
    );
    this.emitter.emit = false;
  }

  main() {
    // ЗДЕСЬ УСТАНАВЛИВАЕМ ФОН
    this.roomsList.classList.add(`room${this.state.currentRoom}`);

    this.createEmitter();

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
    // const onSaveClick = () => {
    //   this.saveGifts();
    // };
    //
    // this.sprites.btnSave = new PIXI.TilingSprite(
    //   this.resources.sprites.textures["pixel_green.png"],
    //   50,
    //   50,
    // );
    // this.sprites.btnSave.anchor.set(0, 0);
    // this.sprites.btnSave.position.set(0, 0);
    // this.sprites.btnSave.interactive = true;
    // this.sprites.btnSave.buttonMode = true;
    // this.sprites.btnSave.on("click", onSaveClick).on("tap", onSaveClick);
    // this.stage.addChild(this.sprites.btnSave);
    //-------

    this.styleFixes();
    if (window.screen.width <= 870) {
      this.elMenu.style.width = `${window.screen.height}px`;
    }

    /**
     * РАБОТАТЬ ТУТ =)
     */
    this.state.currentRoom = parseInt(roomNum, 10);
    // --------

    this.createRoom();
    this.initListeners();

    /**
     * И ТУТ
     */
    // giftsObj[this.state.currentRoom - 1].forEach((obj, index) => {
    //   // if (index > 2) {
    //   //   return;
    //   // }
    //   this.putGift(index);
    // });
    // -------

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

  showTutorial() {
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

      this.elOnboardingContent.style.left = `${
        this.elBlockRange.getBoundingClientRect().x +
        this.elBlockRange.offsetHeight
      }px`;
      this.elOnboardingContent.style.top = `50px`; // 50px - костыль
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

  createRoom() {
    if (this.room) {
      this.stage.removeChild(this.room);
      this.room = null;
    }

    this.room = new PIXI.Sprite(
      this.resources[`room${this.state.currentRoom}`].texture,
    );
    this.room.anchor.set(0.5, 0.5);
    this.room.position.set(this.width / 2, this.height / 2);
    this.room.scale.set(
      Math.min(this.width / this.room.width, this.height / this.room.height),
    );
    this.room.defaultScale = this.room.scale.x;
    this.room.interactive = true;
    this.stage.addChild(this.room);

    this.room.addChild(this.particleContainer);

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
      if (this.state.draggingGift === true) {
        console.log(this.state.dragGift.x, this.state.dragGift.y);
      }

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

    let isGiftDefaultPos = false;
    if (args.length === 1) {
      isGiftDefaultPos = true;
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
    g.alpha = 0;
    // g.scale.set(scale);
    g.angle = rotation;
    g.position.set(x, y);
    g.num = num;
    g.name = spriteName;
    g.interactive = true;
    g.type = "gift";
    // g.on("click", onGiftClick).on("tap", onGiftClick);
    this.room.addChild(g);

    if (isGiftDefaultPos === true) {
      this.emitter.emit = false;
      this.emitter.cleanup();
      this.emitter.resetPositionTracking();
      this.emitter.updateSpawnPos(x, y);
      this.emitter.emit = true;

      gsap.to(g, {
        pixi: { alpha: 1, scale },
        delay: 0.3,
        duration: 1,
        ease: "back.out",
      });
    }

    this.sprites[spriteName] = g;
    this.gifts[spriteName] = g;
  }

  spritesResize() {
    // this.setBlockGifts();

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

  reScaleRoom() {
    if (!this.room) {
      return;
    }

    // console.log(this.state.scale, this.elRange.value);

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

    // Отключаем онбоардинги по клику
    if (this.state.firstVisit === true) {
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
    this.elLinkGift.addEventListener("click", () => {
      if (this.arrGiftsInModal.length === 0) {
        this.createBlockInModalGift();
      }
      this.elModalLk.classList.remove("is-visibility");
      this.elModalGifts.classList.add("is-visibility");
      if (this.state.firstVisit === true) {
        this.elOnboardingGift.classList.add("is-visibility");

        if (window.screen.width > 870) {
          this.elOnboardingWrapperGift.style.left = `${
            (availableWidth - this.elGifts.offsetWidth) / 2
          }px`;
          this.elOnboardingWrapperGift.style.top = `${
            (availableHeight - this.elGiftsContent.offsetHeight) / 2 + 40 + 6
          }px`;
        }
        else {
          this.elOnboardingWrapperGift.style.top = `${
            paddingTopInModalGift +
            heightTitleInModalGift +
            borderWidthInModalGift +
            paddingInnerInModalGift
          }px`;
          this.elOnboardingWrapperGift.style.left = `${
            (window.screen.width - this.elGiftsContent.offsetWidth) / 2 +
            paddingInnerInModalGift +
            borderWidthInModalGift
          }px`;
        }
        setTimeout(() => {
          this.showSecondOnboarding();
        }, 2500);
      }
    });

    // Скрытие онбоардинга в модалке с подарками по нажатию
    this.elOnboardingGift.addEventListener("click", () => {
      this.showSecondOnboarding();
    });

    // Обработка нажатия на кнопку Сменить комнату
    this.elLinkChoice.addEventListener("click", () => {
      window.location.href = "./rooms.html";
      // this.elModalLk.classList.remove("is-visibility");
      //
      // // Удалить все из комнаты и убрать в коробку
      // const arrGifts = this.elCurrentRoom.childNodes;
      // for (let i = arrGifts.length - 1; i >= 0; i--) {
      //   // Обратный порядок перебора массива, чтоб в массиве элементы по индексу не смещались
      //   arrGifts[i].remove();
      // }
      //
      // // При смене комнаты убираем в модалке подарков класс is-active у всех подарков
      // for (let i = 0; i < this.arrGiftsInModal.length; i++) {
      //   if (this.arrGiftsInModal[i].nodeType === 1) {
      //     this.arrGiftsInModal[i].classList.remove("is-active");
      //   }
      // }
      //
      // this.elCallLkModal.classList.remove("is-hidden");
      // this.elCallGiftModal.classList.add("is-hidden");
      // this.setDefaultValueRoomRange();
      // this.state.currentRoom = null;
    });

    // Обработка нажатия на кнопку Подарки в меню
    this.elCallGiftModal.addEventListener("click", () => {
      if (
        this.state.firstVisit === true &&
        this.state.tutorials.giftsModal === false
      ) {
        this.elOnboardingGift.classList.add("is-visibility");
        this.elOnboardingWrapperGift.style.left = `${
          (availableWidth - this.elGifts.offsetWidth) / 2
        }px`;

        if (window.screen.width > 870) {
          this.elOnboardingWrapperGift.style.left = `${
            (availableWidth - this.elGifts.offsetWidth) / 2
          }px`;
          this.elOnboardingWrapperGift.style.top = `${
            (availableHeight - this.elGiftsContent.offsetHeight) / 2 + 40 + 6
          }px`;
        } else {
          this.elOnboardingWrapperGift.style.top = `${
            paddingTopInModalGift +
            heightTitleInModalGift +
            borderWidthInModalGift +
            paddingInnerInModalGift
          }px`;
          this.elOnboardingWrapperGift.style.left = `${
            (window.screen.width - this.elGiftsContent.offsetWidth) / 2 +
            paddingInnerInModalGift +
            borderWidthInModalGift
          }px`;
        }

        setTimeout(() => {
          this.showSecondOnboarding();
        }, 2500);
      }
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
  }

  // Установка высоты модалки с подарками
  setHeightModalWithGifts() {
    if (window.screen.width <= 870) {
      const paddingBottom = 50;
      const valueHeight =
        window.screen.height -
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
  callModalAr() {
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
   * Создание блоков для подарков в модалке подарков
   */
  createBlockInModalGift() {
    const elModal = getElement(".js-gifts");
    this.giftsInModal.forEach((gift, index) => {
      const elGift = document.createElement("div");
      elGift.classList.add("gifts__item");
      elGift.dataset.id = index + 1;
      if (gift.class) {
        // если есть класс в объекте json
        elGift.classList.add(gift.class);
        elGift.addEventListener("click", () => {
          if (
            !elGift.classList.contains("is-active") &&
            elGift.classList.contains("is-can-get")
          ) {
            elGift.classList.add("is-active");
            this.putGift(index + 1);

            // ЗДЕСЬ ДОБАВЛЯЕМ ЗАКРЫТИЕ МОДАЛКИ
            this.elModalGifts.classList.remove("is-visibility");

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
      elImg.src = `assets/images/gifts/${gift.src}.png`;
      const elSpan = document.createElement("span");
      elSpan.textContent = `${index + 1}`;
      elGift.append(elSpan);
      elGift.append(elImg);
      elModal.append(elGift);
    });
  }

  // Показ-скрытие онбоардинга в модалке подарков
  showSecondOnboarding() {
    if (this.state.tutorials.giftsModal === true) {
      return;
    }

    this.elOnboardingGift.classList.add("is-added");
    if (this.elOnboardingGift.classList.contains("is-added")) {
      setTimeout(() => {
        this.elOnboardingGift.classList.remove("is-visibility");
        this.elOnboardingGift.classList.remove("z-index-max");
        this.elOnboardingGift.classList.remove("is-added");

        this.state.tutorials.giftsModal = true;
      }, 1500);
    }
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

  renderGame(time, deltaTime, frame) {
    if (this.emitter !== null) {
      this.emitter.update(deltaTime * 0.001);
    }
  }
}

window.addEventListener("load", () => {
  const b = new RoomApp();
  if (!b) {
    throw new Error("App creation error");
  }
});
