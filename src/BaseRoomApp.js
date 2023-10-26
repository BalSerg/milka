import * as PIXI from "pixi.js";

// import Stats from "three/examples/jsm/libs/stats.module";
// import * as particles from "@pixi/particle-emitter";
// import { GlowFilter } from "pixi-filters";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import config from "./config";
import reachGoal from "./reachGoal";

// const Hammer = require("hammerjs");
// const Connector = require("./pixi-hammer");

// const gui = new GUI();
// gui.hide();

// const stats = new Stats();
// document.body.appendChild(stats.dom);

const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

export default class BaseRoomApp {
  constructor() {
    this.STATES = {
      LOADER: "loader",
      ROOM: "room",
    };

    // this.preloader = document.querySelector(".preloader");
    this.wrapper = document.querySelector(".room-content");
    this.pixifeed = document.querySelector(".pixifeed");
    // this.spin = document.querySelector(".spin");

    this.stage = null;
    this.bg = null;

    this.width = 0;
    this.height = 0;

    this.state = {
      currentState: this.STATES.LOADER,

      loaded: {
        pixi: false,
      },
    };

    this.render = this.render.bind(this);

    PIXI.utils.skipHello();
    this.app = new PIXI.Application({
      resizeTo: window,
      transparent: false,
      backgroundAlpha: 1,
      autoResize: true,
      antialias: true,
      view: this.pixifeed,
      resolution: devicePixelRatio,
      backgroundColor: 0xff0000,
      // backgroundColor: 0x7d69ac,
      powerPreference: "high-performance",
    });
    // eslint-disable-next-line no-underscore-dangle
    window.__PIXI_APP__ = this.app;

    this.resources = null;
    this.sprites = {};

    this.tweens = {};

    gsap.registerPlugin(PixiPlugin);
    // gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
    PixiPlugin.registerPIXI(PIXI);

    this.app.ticker.stop();
    // gsap.ticker.fps(30);
    gsap.ticker.add(() => {
      this.app.ticker.update();
    });

    // const hammertime = new Hammer.Manager(this.app.view, {
    //   recognizers: [
    //     [Hammer.Pinch],
    //     [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
    //   ],
    // });
    //
    // this.hammer = new Connector(
    //   this.app.view,
    //   this.app.renderer.plugins.interaction,
    //   hammertime
    // );
    //
    // this.hammer.registerHandlerTypes([
    //   "pinchin",
    //   "pinchout",
    //   "pinchstart",
    //   "pinch",
    //   "pinchend",
    //   "pinchmove",
    //
    //   // "swiperight",
    //   // "swipeleft",
    //   // "pointerdown",
    //   // "pointermove",
    //   // "pointerupoutside",
    //   // "pointerup",
    // ]);

    // this.loader();
  }

  onLoaded() {
    if (this.state.loaded.pixi !== true) {
      return;
    }

    // this.preloader.classList.add("hidden");
    this.pixifeed.classList.remove("hidden");

    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("orientationchange", this.resize.bind(this));

    this.stage = new PIXI.TilingSprite(
      this.resources.sprites.textures["pixel.png"],
      this.width,
      this.height,
    );
    this.app.stage.addChild(this.stage);

    // this.preloader.remove();

    this.resize();

    this.pixiStart();
  }

  pixiStart() {
    this.wrapper.classList.remove("is-hidden");

    gsap.ticker.add(this.render);

    this.main();
  }

  // eslint-disable-next-line class-methods-use-this
  main() {
    // console.log("You need to redefine main()");
  }

  loader() {
    const loader = PIXI.Loader.shared;
    const nocache = `?ts=${new Date().getTime()}`;

    if (config.preload && config.preload.length > 0) {
      for (let i = 0; i < config.preload.length; i++) {
        loader.add(config.preload[i][0], config.preload[i][1] + nocache);
      }

      loader.load((preloadLoaderI, preloadResources) => {
        this.resources = preloadResources;

        this.state.loaded.pixi = true;
        this.onLoaded();
      });
    } else {
      this.state.loaded.pixi = true;
      this.onLoaded();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  spritesResize() {}

  resize() {
    const { clientWidth, clientHeight } = document.documentElement;

    this.height = Math.ceil(clientHeight);
    this.width = Math.ceil(clientWidth);

    this.spritesResize();
  }

  clear() {
    this.stage.removeChildren();
    this.sprites = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const tweenName in this.tweens) {
      if (this.tweens[tweenName]) {
        this.tweens[tweenName].kill();
        this.tweens[tweenName] = null;
      }
    }
    this.tweens = {};
  }

  // eslint-disable-next-line no-unused-vars
  render(time, deltaTime, frame) {
    // stats.update();
  }
}
