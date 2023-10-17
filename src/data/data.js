const giftsInModal = [
  { src: "gift1", class: "is-can-get" },
  { src: "gift2", class: "is-can-get" },
  { src: "gift3", class: "is-can-get" },
  { src: "gift4", class: "is-can-get" },
  { src: "gift5", class: "is-can-get" },
  { src: "gift6", class: "is-can-get" },
  { src: "gift7", class: "is-can-get" },
  { src: "gift8", class: "is-can-get" },
  { src: "gift9", class: "is-can-get" },
  { src: "gift10", class: "is-can-get" },
  { src: "gift11", class: "is-can-get" },
  { src: "gift12", class: "is-can-get" },
  { src: "gift13" },
  { src: "gift14" },
  { src: "gift15" },
  { src: "gift16" },
  { src: "gift17" },
  { src: "gift18" },
  { src: "gift19" },
  { src: "gift20" },
  { src: "gift21" },
  { src: "gift22" },
  { src: "gift23" },
  { src: "gift24" },
  { src: "gift25" },
  { src: "gift26" },
];

const giftsObj = [
  [
    { left: 360, top: 30, scale: 0.8, rotate: 0 },
    { left: 65, top: 130, scale: 0.5, rotate: 0 },
    { left: 675, top: 30, scale: 0.8, rotate: 0 },
    { left: 700, top: 190, scale: 0.45, rotate: 0 },
    { left: 650, top: 205, scale: 0.4, rotate: 90 },
    { left: 190, top: 415, scale: 0.8, rotate: 0 },
    { left: 630, top: 255, scale: 0.5, rotate: 0 },
    { left: 250, top: 500, scale: 1, rotate: 0 },
    { left: 385, top: 175, scale: 0.5, rotate: 0 },
    { left: 60, top: 15, scale: 0.8, rotate: 0 },
    { left: 255, top: 370, scale: 0.6, rotate: 0 },
    { left: 235, top: 265, scale: 0.9, rotate: 0 },
    { left: 600, top: 360, scale: 0.6, rotate: 0 },
    { left: 105, top: 190, scale: 0.6, rotate: 0 },
    { left: 385, top: 235, scale: 0.5, rotate: 0 },
    { left: 190, top: 160, scale: 0.8, rotate: 0 },
    { left: 280, top: 225, scale: 0.6, rotate: 0 },
    { left: 290, top: -75, scale: 0.6, rotate: 45 },
    { left: 120, top: 425, scale: 0.7, rotate: 0 },
    { left: 320, top: 155, scale: 0.7, rotate: 0 },
    { left: 650, top: 125, scale: 0.6, rotate: 0 },
    { left: 325, top: 340, scale: 0.5, rotate: 0 },
    { left: 125, top: -70, scale: 0.35, rotate: 45 },
    { left: 380, top: 305, scale: 0.6, rotate: 0 },
    { left: 620, top: 25, scale: 0.8, rotate: 0 },
    { left: 165, top: -75, scale: 0.45, rotate: -80 },
  ],
  [
    { left: 335, top: 50, scale: 0.8, rotate: 0 },
    { left: 435, top: 95, scale: 0.5, rotate: 0 },
    { left: 515, top: 545, scale: 0.8, rotate: 0 },
    { left: 50, top: 300, scale: 0.5, rotate: 0 },
    { left: 440, top: 340, scale: 0.45, rotate: 80 },
    { left: 280, top: 490, scale: 0.8, rotate: 0 },
    { left: 345, top: 175, scale: 0.5, rotate: 0 },
    { left: 360, top: 550, scale: 1, rotate: 0 },
    { left: 365, top: 245, scale: 0.45, rotate: 0 },
    { left: 70, top: 40, scale: 0.7, rotate: 0 },
    { left: 270, top: 370, scale: 0.7, rotate: 0 },
    { left: 655, top: 475, scale: 0.8, rotate: 0 },
    { left: 200, top: 245, scale: 0.6, rotate: 0 },
    { left: 100, top: 295, scale: 0.6, rotate: 0 },
    { left: 485, top: 280, scale: 0.6, rotate: 0 },
    { left: 170, top: 160, scale: 0.8, rotate: 0 },
    { left: 270, top: 225, scale: 0.6, rotate: 0 },
    { left: 420, top: 325, scale: 0.55, rotate: 0 },
    { left: 155, top: 415, scale: 0.6, rotate: 0 },
    { left: 315, top: 170, scale: 0.6, rotate: 0 },
    { left: 435, top: 220, scale: 0.6, rotate: 0 },
    { left: 330, top: 340, scale: 0.45, rotate: 0 },
    { left: 200, top: -70, scale: 0.4, rotate: 50 },
    { left: 360, top: 300, scale: 0.5, rotate: 0 },
    { left: 160, top: 20, scale: 0.8, rotate: 0 },
    { left: 50, top: 95, scale: 0.5, rotate: -14 },
  ],
  [
    { left: 550, top: 450, scale: 1.1, rotate: 0 },
    { left: 385, top: 60, scale: 0.5, rotate: 0 },
    { left: 435, top: 205, scale: 0.6, rotate: 0 },
    { left: 30, top: 275, scale: 0.45, rotate: 0 },
    { left: 630, top: 345, scale: 0.45, rotate: 80 },
    { left: 280, top: 405, scale: 0.8, rotate: 0 },
    { left: 345, top: 315, scale: 0.5, rotate: 0 },
    { left: 390, top: 595, scale: 1, rotate: 15 },
    { left: 640, top: 215, scale: 0.4, rotate: 0 },
    { left: 85, top: 85, scale: 0.6, rotate: 0 },
    { left: 170, top: 410, scale: 0.7, rotate: 0 },
    { left: 165, top: 290, scale: 1, rotate: 0 },
    { left: 0, top: 125, scale: 0.5, rotate: 0 },
    { left: 45, top: 300, scale: 0.5, rotate: 0 },
    { left: 620, top: 125, scale: 0.8, rotate: 0 },
    { left: 180, top: 185, scale: 0.8, rotate: 0 },
    { left: 175, top: 285, scale: 0.6, rotate: 0 },
    { left: 140, top: -15, scale: 0.5, rotate: 0 },
    { left: 40, top: 355, scale: 0.45, rotate: 0 },
    { left: 575, top: 190, scale: 0.6, rotate: 0 },
    { left: 615, top: 275, scale: 0.45, rotate: 0 },
    { left: 70, top: 235, scale: 0.5, rotate: 0 },
    { left: 445, top: 375, scale: 0.4, rotate: -10 },
    { left: 620, top: 395, scale: 0.5, rotate: 0 },
    { left: 240, top: 70, scale: 0.9, rotate: 0 },
    { left: 115, top: 405, scale: 0.45, rotate: 0 },
  ],
];

const giftsObjMobile = [
  [
    { left: 165, top: 0, scale: 0.65, rotate: 0 },
    { left: 30, top: 45, scale: 0.5, rotate: 0 },
    { left: 305, top: -15, scale: 0.4, rotate: 0 },
    { left: 325, top: 25, scale: 0.2, rotate: 0 },
    { left: 295, top: 35, scale: 0.2, rotate: 90 },
    { left: 70, top: 165, scale: 0.4, rotate: 0 },
    { left: 300, top: 115, scale: 0.45, rotate: 0 },
    { left: 150, top: 255, scale: 1, rotate: 0 },
    { left: 170, top: 90, scale: 0.3, rotate: 0 },
    { left: 15, top: -7, scale: 0.5, rotate: 0 },
    { left: 110, top: 175, scale: 0.4, rotate: 0 },
    { left: 105, top: 100, scale: 0.4, rotate: 0 },
    { left: 283, top: 165, scale: 0.4, rotate: 0 },
    { left: 40, top: 85, scale: 0.4, rotate: 0 },
    { left: 168, top: 53, scale: 0.25, rotate: 0 },
    { left: 70, top: 50, scale: 0.4, rotate: 0 },
    { left: 125, top: 100, scale: 0.5, rotate: 0 },
    { left: 135, top: -52, scale: 0.4, rotate: 35 },
    { left: 45, top: 210, scale: 0.4, rotate: 0 },
    { left: 138, top: 45, scale: 0.3, rotate: 0 },
    { left: 300, top: 80, scale: 0.4, rotate: 0 },
    { left: 140, top: 140, scale: 0.25, rotate: 0 },
    { left: 60, top: -55, scale: 0.3, rotate: 45 },
    { left: 170, top: 130, scale: 0.3, rotate: 0 },
    { left: 280, top: -18, scale: 0.4, rotate: 0 },
    { left: 80, top: -55, scale: 0.35, rotate: -75 },
  ],
  [
    { left: 158, top: 10, scale: 0.65, rotate: 0 },
    { left: 200, top: 30, scale: 0.4, rotate: 0 },
    { left: 233, top: 240, scale: 0.45, rotate: 0 },
    { left: 15, top: 113, scale: 0.25, rotate: 0 },
    { left: 198, top: 138, scale: 0.2, rotate: 90 },
    { left: 120, top: 205, scale: 0.4, rotate: 0 },
    { left: 160, top: 75, scale: 0.4, rotate: 0 },
    { left: 180, top: 255, scale: 0.65, rotate: 0 },
    { left: 160, top: 92, scale: 0.25, rotate: 0 },
    { left: 15, top: 2, scale: 0.5, rotate: 0 },
    { left: 120, top: 175, scale: 0.5, rotate: 0 },
    { left: 310, top: 205, scale: 0.4, rotate: 0 },
    { left: 85, top: 110, scale: 0.4, rotate: 0 },
    { left: 40, top: 135, scale: 0.4, rotate: 0 },
    { left: 220, top: 105, scale: 0.3, rotate: 0 },
    { left: 70, top: 50, scale: 0.4, rotate: 0 },
    { left: 120, top: 100, scale: 0.5, rotate: 0 },
    { left: 200, top: 140, scale: 0.4, rotate: 0 },
    { left: 70, top: 195, scale: 0.4, rotate: 0 },
    { left: 136, top: 55, scale: 0.3, rotate: 0 },
    { left: 200, top: 95, scale: 0.3, rotate: 0 },
    { left: 140, top: 140, scale: 0.25, rotate: 0 },
    { left: 90, top: -53, scale: 0.35, rotate: 55 },
    { left: 160, top: 125, scale: 0.25, rotate: 0 },
    { left: 60, top: -18, scale: 0.4, rotate: 0 },
    { left: 20, top: 25, scale: 0.4, rotate: 0 },
  ],
  [
    { left: 265, top: 210, scale: 0.8, rotate: 0 },
    { left: 175, top: 15, scale: 0.4, rotate: 0 },
    { left: 195, top: 69, scale: 0.3, rotate: 0 },
    { left: 10, top: 105, scale: 0.2, rotate: 0 },
    { left: 290, top: 137, scale: 0.2, rotate: 90 },
    { left: 120, top: 165, scale: 0.4, rotate: 0 },
    { left: 165, top: 145, scale: 0.4, rotate: 0 },
    { left: 180, top: 275, scale: 0.7, rotate: 0 },
    { left: 290, top: 75, scale: 0.2, rotate: 0 },
    { left: 35, top: 22, scale: 0.4, rotate: 0 },
    { left: 70, top: 192, scale: 0.4, rotate: 0 },
    { left: 70, top: 115, scale: 0.4, rotate: 0 },
    { left: -5, top: 50, scale: 0.4, rotate: 0 },
    { left: 15, top: 137, scale: 0.4, rotate: 0 },
    { left: 285, top: 35, scale: 0.3, rotate: 0 },
    { left: 70, top: 65, scale: 0.4, rotate: 0 },

    { left: 80, top: 127, scale: 0.5, rotate: 0 },
    { left: 75, top: -25, scale: 0.4, rotate: 0 },
    { left: 15, top: 165, scale: 0.4, rotate: 0 },
    { left: 262, top: 70, scale: 0.4, rotate: 0 },
    { left: 285, top: 120, scale: 0.3, rotate: 0 },
    { left: 15, top: 90, scale: 0.25, rotate: 0 },
    { left: 200, top: 160, scale: 0.3, rotate: 20 },
    { left: 285, top: 173, scale: 0.3, rotate: 0 },
    { left: 110, top: -10, scale: 0.4, rotate: 0 },
    { left: 50, top: 180, scale: 0.3, rotate: 0 },
    { left: 70, top: 165, scale: 0.4, rotate: 0 },
  ],
];

export { giftsObjMobile, giftsObj, giftsInModal };