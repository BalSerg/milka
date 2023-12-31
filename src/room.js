import "./scss/main.scss";

import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import * as particles from "@pixi/particle-emitter";

import { GlowFilter } from "pixi-filters";

import { getElement, getArrayElements } from "./utils";
import config from "./config";
import giftsObj from "./data/data";
import BaseRoomApp from "./BaseRoomApp";

import giftParticles from "./giftParticles";

// import roomNum from "./urlParams";

const topValue = 160;

const heightTitleInModalGift = 104;
const paddingTopInModalGift = 88;
const paddingInnerInModalGift = 24;
const borderWidthInModalGift = 6;

const availableWidth = document.documentElement.scrollWidth;
const availableHeight = document.documentElement.scrollHeight;

const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

class RoomApp extends BaseRoomApp {
  constructor() {
    super();

    let language = "ru";

    switch (language) {
      case "ru":
        getElement(".modal-lk-content>div").classList.add("font-ru");
        getElement(".modal-lk-content li").classList.add("font-ru");
        getElement(".js-qr .modal__text").classList.add("font-ru");
        getElement(".js-modal-gifts .modal-gifts__title").classList.add(
          "font-ru",
        );
        getElement(".js-gift-box > img").src = "/assets/images/btn_box.png";
        getElement(".js-gift-ar > img").src = "/assets/images/btn_ar.png";
        getElement(".js-onboarding-content > span").classList.add("font-ru");
        getElement(".js-onboarding-content-gift > span").classList.add(
          "font-ru",
        );
        getElement(".js-onboarding-content-lk > span").classList.add("font-ru");
        getElement(".js-onboarding-wrapper-gift span").classList.add("font-ru");
        break;

      case "kz":
        getElement(".modal-lk-content>div").classList.add("font-kz");
        getElement(".modal-lk-content li").classList.add(
          "font-lifehack-pacifico",
        );
        getElement(".js-qr .modal__text").classList.add(
          "font-lifehack-pacifico",
        );
        getElement(".js-modal-gifts .modal-gifts__title").classList.add(
          "font-kz",
        );
        getElement(".js-gift-box > img").src = "/assets/images/btn_box_kz.png";
        getElement(".js-gift-ar > img").src = "/assets/images/btn_ar_kz.png";
        getElement(".js-onboarding-content > span").classList.add("font-kz");
        getElement(".js-onboarding-content-gift > span").classList.add(
          "font-kz",
        );
        getElement(".js-onboarding-content-lk > span").classList.add("font-kz");
        getElement(".js-onboarding-wrapper-gift span").classList.add("font-kz");
        break;

      case "az":
        getElement(".modal-lk-content>div").classList.add(
          "font-appetite-helvetica",
        );
        getElement(".modal-lk-content li").classList.add(
          "font-lifehack-helvetica",
        );
        getElement(".js-qr .modal__text").classList.add("font-helvetica");
        getElement(".js-modal-gifts .modal-gifts__title").classList.add(
          "font-appetite-helvetica",
        );
        getElement(".js-gift-box > img").src = "/assets/images/btn_box_az.png";
        getElement(".js-gift-ar > img").src = "/assets/images/btn_ar_az.png";
        getElement(".js-onboarding-content > span").classList.add(
          "font-appetite-helvetica",
        );
        getElement(".js-onboarding-content-gift > span").classList.add(
          "font-appetite-helvetica",
        );
        getElement(".js-onboarding-content-lk > span").classList.add(
          "font-appetite-helvetica",
        );
        getElement(".js-onboarding-wrapper-gift span").classList.add(
          "font-appetite-helvetica",
        );
        break;

      case "uz":
        getElement(".modal-lk-content>div").classList.add("font-uz");
        getElement(".modal-lk-content li").classList.add("font-uz");
        getElement(".js-qr .modal__text").classList.add("font-uz");
        getElement(".js-modal-gifts .modal-gifts__title").classList.add(
          "font-uz",
        );
        getElement(".js-gift-box > img").src = "/assets/images/btn_box_uz.png";
        getElement(".js-gift-ar > img").src = "/assets/images/btn_ar_uz.png";
        getElement(".js-onboarding-content > span").classList.add("font-uz");
        getElement(".js-onboarding-content-gift > span").classList.add(
          "font-uz",
        );
        getElement(".js-onboarding-content-lk > span").classList.add("font-uz");
        getElement(".js-onboarding-wrapper-gift span").classList.add("font-uz");
        break;

      case "kg":
        getElement(".modal-lk-content>div").classList.add("font-kz");
        getElement(".modal-lk-content li").classList.add(
          "font-lifehack-pacifico",
        );
        getElement(".js-qr .modal__text").classList.add(
          "font-lifehack-pacifico",
        );
        getElement(".js-modal-gifts .modal-gifts__title").classList.add(
          "font-kz",
        );
        getElement(".js-gift-box > img").src = "/assets/images/btn_box_kg.png";
        getElement(".js-gift-ar > img").src = "/assets/images/btn_ar_kg.png";
        getElement(".js-onboarding-content > span").classList.add("font-kz");
        getElement(".js-onboarding-content-gift > span").classList.add(
          "font-kz",
        );
        getElement(".js-onboarding-content-lk > span").classList.add("font-kz");
        getElement(".js-onboarding-wrapper-gift span").classList.add("font-kz");
        break;

      case "mn":
        getElement(".modal-lk-content>div").classList.add("font-kz");
        getElement(".modal-lk-content li").classList.add(
          "font-lifehack-pacifico",
        );
        getElement(".js-qr .modal__text").classList.add(
          "font-lifehack-pacifico",
        );
        getElement(".js-modal-gifts .modal-gifts__title").classList.add(
          "font-kz",
        );
        getElement(".js-gift-box > img").src = "/assets/images/btn_box_mn.png";
        getElement(".js-gift-ar > img").src = "/assets/images/btn_ar_mn.png";
        getElement(".js-onboarding-content > span").classList.add("font-kz");
        getElement(".js-onboarding-content-gift > span").classList.add(
          "font-kz",
        );
        getElement(".js-onboarding-content-lk > span").classList.add("font-kz");
        getElement(".js-onboarding-wrapper-gift span").classList.add("font-kz");
        break;

      case "ge":
        getElement(".modal-lk-content>div").classList.add("font-helvetica");
        getElement(".modal-lk-content li").classList.add("font-helvetica");
        getElement(".js-qr .modal__text").classList.add("font-helvetica");
        getElement(".js-modal-gifts .modal-gifts__title").classList.add(
          "font-helvetica",
        );
        getElement(".js-gift-box > img").src = "/assets/images/btn_box_ge.png";
        getElement(".js-gift-ar > img").src = "/assets/images/btn_ar_ge.png";
        getElement(".js-onboarding-content > span").classList.add(
          "font-helvetica",
        );
        getElement(".js-onboarding-content-gift > span").classList.add(
          "font-helvetica",
        );
        getElement(".js-onboarding-content-lk > span").classList.add(
          "font-helvetica",
        );
        getElement(".js-onboarding-wrapper-gift span").classList.add(
          "font-helvetica",
        );
        break;

      case "am":
        getElement(".modal-lk-content>div").classList.add("font-amGuard");
        getElement(".modal-lk-content li").classList.add("font-amHelv");
        getElement(".js-qr .modal__text").classList.add("font-amHelv");
        getElement(".js-modal-gifts .modal-gifts__title").classList.add(
          "font-amGuard",
        );
        getElement(".js-gift-box > img").src = "/assets/images/btn_box_am.png";
        getElement(".js-gift-ar > img").src = "/assets/images/btn_ar_am.png";
        getElement(".js-onboarding-content > span").classList.add(
          "font-amHelv",
        );
        getElement(".js-onboarding-content-gift > span").classList.add(
          "font-amHelv",
        );
        getElement(".js-onboarding-content-lk > span").classList.add(
          "font-amHelv",
        );
        getElement(".js-onboarding-wrapper-gift span").classList.add(
          "font-amHelv",
        );
        break;

      default:
    }

    this.state = Object.assign(this.state, {
      firstVisit: window.firstVisit,

      tutorials: {
        giftsModal: true,
        firstGift: true,
      },

      draggingGift: false,
      dragGift: null,
      draggingRoom: false,
      dragData: null,

      dragGiftStartTime: 0,

      isModal: false,

      scale: 1.2,

      isClickBoardingGift: false, // флаг щелчка на онбоардинге кнопки подарка в меню
      isClickBoardingLk: false, // флаг щелчка на онбоардинге кнопки ЛК в меню

      currentRoom: parseInt(window.room, 10) || 1,
    });

    console.log(this.state.currentRoom, parseInt(window.room, 10));

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

    this.giftMenu = getElement(".js-gift-menu");
    this.giftBtnAR = getElement(".js-gift-ar", this.giftMenu);
    this.giftBtnBox = getElement(".js-gift-box", this.giftMenu);

    this.tutorialGift = getElement(".js-tutorial-room");

    // this.elLoader = getElement(".js-loader");

    this.modalGiftsContentMobile = 0;

    // this.resize = this.resize.bind(this);
    // this.initListeners();
    this.setBlockGifts();
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
    if (window.screen.width <= 870) {
      this.elMenu.style.width = `${this.roomsList.offsetHeight}px`;
    }
    this.elBlockRange.classList.remove("is-hidden");
    this.elMenu.classList.remove("is-hidden");
    this.showTutorial();

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

      if (window.screen.width > 870) {
        this.elOnboardingContent.style.left = `${
          this.elBlockRange.getBoundingClientRect().x +
          this.elBlockRange.offsetHeight
        }px`;
        //this.elOnboardingContent.style.top = `50px`; // 50px - костыль
        this.elOnboardingContent.style.top = `${
          this.elBlockRange.getBoundingClientRect().y -
          this.elOnboardingContent.offsetHeight
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

      this.hideGiftMenu();

      // eslint-disable-next-line no-prototype-builtins
      if (e.target.hasOwnProperty("type") && e.target.type === "gift") {
        this.state.draggingGift = true;
        this.state.dragGift = e.target;

        this.state.dragGiftStartTime = Date.now();
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
        // console.log(this.state.dragGift.x, this.state.dragGift.y);
        const now = Date.now();
        const diff = Math.floor(now - this.state.dragGiftStartTime);
        // console.log(diff);
        if (diff < config.clickGiftTimeout) {
          this.state.dragGiftStartTime = 0;
          const stagePos = this.state.dragGift.getGlobalPosition();

          this.showGiftMenu(
            stagePos.x,
            stagePos.y,
            this.state.dragGift.name,
            this.state.dragGift.num,
          );
        }
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

  hideGiftMenu() {
    this.giftMenu.classList.add("is-hidden");
    this.giftMenu.dataset.gift = "";
    this.giftMenu.dataset.id = "";
  }

  showGiftMenu(x = 0, y = 0, name = "", num = "") {
    if (name === "" || num === "") {
      return;
    }

    this.giftMenu.style.left = `${x}px`;
    this.giftMenu.style.top = `${y}px`;

    this.giftMenu.dataset.gift = name;
    this.giftMenu.dataset.id = num;
    this.giftMenu.classList.remove("is-hidden");
  }

  removeGift(num = 1) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.gifts.hasOwnProperty(`gift${num}`)) {
      console.log("No gift with num", num);
      return;
    }

    this.room.removeChild(this.gifts[`gift${num}`]);
    delete this.gifts[`gift${num}`];

    const giftItem = getElement(`.gifts__item[data-id="${num}"]`, this.elGifts);
    giftItem.classList.remove("is-active");

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
    // console.log(args);

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

      if (this.state.tutorials.firstGift === false) {
        this.state.tutorials.firstGift = true;

        const stagePos = g.getGlobalPosition();
        let corner = "";

        if (stagePos.x <= this.width / 2) {
          corner += "_left";
        } else {
          corner += "_right";
        }

        if (stagePos.y <= this.height / 2) {
          corner += "_top";
        } else {
          corner += "_bottom";
        }

        this.sprites.bg = new PIXI.TilingSprite(
          this.resources.sprites.textures["pixel_black.png"],
          window.innerWidth * devicePixelRatio * 4,
          window.innerHeight * devicePixelRatio * 4,
        );
        this.sprites.bg.anchor.set(0.5);
        this.sprites.bg.alpha = 0.65;
        this.room.addChild(this.sprites.bg);

        const giftTMP = new PIXI.Sprite(
          this.resources.gifts.textures[`gift${num}.png`],
        );
        giftTMP.anchor.set(0.5);
        giftTMP.scale.set(0);
        giftTMP.angle = rotation;
        giftTMP.position.set(x, y);
        giftTMP.filters = [new GlowFilter({ distance: 20, outerStrength: 10 })];
        this.sprites.bg.addChild(giftTMP);

        const t = gsap.timeline();
        t.to(giftTMP, {
          pixi: { alpha: 1, scale },
          // delay: 0.2,
          duration: 1,
          ease: "back.out",
        }).to(giftTMP, {
          pixi: { alpha: 0 },
          delay: 4.5,
          duration: 0.2,
          onComplete: () => {
            this.room.removeChild(this.sprites.bg);
            this.sprites.bg = null;
          },
        });

        this.tutorialGift.classList.remove("is-hidden");
        const tutorialImage = this.tutorialGift.querySelector("img");
        if (corner.includes("right")) {
          if (window.screen.width > 870) {
            // 556 - изначальный размер картинки, 1.9 во столько раз картинка уменьшена стилем 20%
            tutorialImage.style.left = `${stagePos.x - 556 / 1.9}px`;
          } else {
            // 556 - изначальный размер картинки, 3.8 во столько раз картинка уменьшена стилем 40%
            tutorialImage.style.left = `${stagePos.x - 556 / 3.4}px`;
          }
        } else {
          tutorialImage.style.left = `${stagePos.x}px`;
        }
        tutorialImage.style.top = `${stagePos.y}px`;

        tutorialImage.src = `/assets/onboardingRoom${corner}.png`;
        this.tutorialGift.addEventListener("click", () => {
          this.tutorialGift.classList.add("is-hidden");
        });

        gsap.to(
          {},
          {
            duration: 5,
            onComplete: () => {
              if (!this.tutorialGift.classList.contains("is-hidden")) {
                this.tutorialGift.classList.add("is-hidden");
              }

              // FIXME
              if (t) {
                t.kill();

                this.room.removeChild(this.sprites.bg);
                this.sprites.bg = null;
              }
            },
          },
        );
      }
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

    const data = JSON.stringify({
      room: this.state.currentRoom,
      positions: objToSave,
    });

    const formData = new FormData();
    formData.append("data", data);
    formData.append("csrf", window.csrf || "");

    console.log(formData.values());

    fetch("/personal/save", {
      method: "POST",
      // headers: {
      //  "Content-Type": "application/json;charset=utf-8",
      // },
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => alert(result.result))
      .catch((e) => {
        console.log(e);
      });

    console.log(data);
  }

  loadGifts(data = []) {
    if (data.length === 0) {
      // console.log("no data");
      return;
    }

    data.forEach(({ name, num, x, y, scale, rotation }) => {
      console.log(name, num, x, y, scale, rotation);
      this.putGift(num, x, y, scale, rotation, name);
    });
  }

  initListeners() {
    this.giftBtnAR.addEventListener("click", () => {
      // console.log(this.giftMenu.dataset.gift, this.giftMenu.dataset.id);

      this.callModalAr(this.giftMenu.dataset.id);
      this.hideGiftMenu();
    });

    this.giftBtnBox.addEventListener("click", () => {
      this.removeGift(this.giftMenu.dataset.id);
      this.hideGiftMenu();
    });

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
      this.elModalGifts.classList.add("is-visibility");
      this.elModalLk.classList.remove("is-visibility");
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

      /*if (this.arrGiftsInModal.length === 0) {
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
      }*/
    });

    // Скрытие онбоардинга в модалке с подарками по нажатию
    this.elOnboardingGift.addEventListener("click", () => {
      this.showSecondOnboarding();
    });

    // Обработка нажатия на кнопку Сменить комнату
    this.elLinkChoice.addEventListener("click", () => {
      window.location.href = "/personal/clear";
    });

    const logoutLink = getElement(".js-link-logout");
    logoutLink.addEventListener("click", () => {
      window.location.href = "/logout";
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
      this.saveGifts();
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
  // eslint-disable-next-line class-methods-use-this
  callModalAr(giftID) {
    if (window.screen.width >= config.size.desktop) {
      // Собираем все кнопки с классом js-call-ar
      // getArrayElements(".js-call-ar").forEach((item) => {
      //   item.addEventListener("click", () => {
      // На каждую вешаем событие
      // const indexGift = this.getIndexElementFromCollection(item); // Определяем индекс подарка
      getElement(
        ".js-qr-code",
      ).src = `/assets/images/qr-codes/qr-code${giftID}.png`; // Индекс добавляем в адрес картинки с qr кодом
      getElement(".js-qr").classList.add("is-visibility"); // Показываем модалку
      // });
      // });
    } else {
      window.location.href = `https://brainrus.ru/milka-ny24/advent/?gift=${giftID}`;
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
          }
        });
      }
      const elImg = document.createElement("img");

      elImg.src = `/assets/images/gifts/${gift.src}${
        window.screen.width >= 870 ? "" : "_m"
      }.png`;
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
    let elWidth = 128;
    let margin = 48;
    const maxCount = 8;
    const borderWidth = 6;
    const scrollWidth = 4;
    let outerPadding = 48;
    let innerPadding = 40;
    if (window.screen.width <= 870) {
      elWidth = 80;
      margin = 24;
      outerPadding = 16;
      innerPadding = 24;
    }
    console.log(availableWidth, outerPadding);
    const availableWidthBlock = availableWidth - outerPadding * 2;
    const generalWidth =
      availableWidthBlock - innerPadding * 2 - borderWidth * 2;
    //innerPadding * 2 -
    //borderWidth * 2;
    let countElements = Math.trunc(generalWidth / (elWidth + margin));
    if (countElements >= maxCount) {
      countElements = maxCount;
    }
    let newWidth;
    if (window.navigator.userAgent.indexOf("Fire") !== -1) {
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
    elGifts.style.maxWidth = `${newWidth}px`;
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
