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
    { x: 0, y: 0, scale: 1.0, rotation: 0 }, // ЭТО МОЖНО НЕ ТРОГАТЬ
    { x: 30, y: -730, scale: 0.35, rotation: 0 }, // Это подарок 1 =)
    { x: -650, y: -580, scale: 0.15, rotation: 0 },
    { x: 700, y: -820, scale: 0.25 , rotation: 0 },
    { x: 730, y: -560, scale: 0.12, rotation: 0 },
    { x: 670, y: -540, scale: 0.1, rotation: 90 },
    { x: -480, y: 180, scale: 0.25, rotation: 0 },
    { x: 720, y: -230, scale: 0.2, rotation: 0 },  //7
    { x: -185, y: 405, scale: 0.4, rotation: 0 },
    {  x: 30, y: -280, scale: 0.15, rotation: 0 },
    { x: -760, y: -825, scale: 0.2, rotation: 0 },// 10
    { x: -250, y: -15, scale: 0.15, rotation: 0 },
    { x: -400, y: -220, scale: 0.2, rotation: 0 },
    { x: 630, y: 85, scale: 0.2, rotation: 0 },
    { x: -620, y: -410, scale: 0.15, rotation: 0 },// 14
    { x: 30, y: -450, scale: 0.13, rotation: 0 },
    { x: -480, y: -520, scale: 0.15, rotation: 0 },// 16
    { x: -170, y: -270, scale: 0.2, rotation: 0 },
    { x: -110, y: -910, scale: 0.3, rotation: 45 },// 18
    { x: -620, y: 240, scale: 0.2, rotation: 0 },
    { x: -120, y: -520, scale: 0.2, rotation: 0 },
    { x: 700, y: -400, scale: 0.13, rotation: 0 },// 21
    { x: -100, y: -50, scale: 0.15, rotation: -20 },
    { x: -500, y: -850, scale: 0.3, rotation: 55 },
    { x: 30, y: -120, scale: 0.17, rotation: 0 },
    { x: 580, y: -820, scale: 0.2, rotation: 0 },// 25
    { x: -360, y: -850, scale: 0.2, rotation: -80 },
  ],
  [
    { x: 0, y: 0, scale: 1.0, rotation: 0 }, // ЭТО МОЖНО НЕ ТРОГАТЬ
    { x: -25, y: -695, scale: 0.35, rotation: 0 }, // Это подарок 1 =)
    { x: 185, y: -670, scale: 0.15, rotation: 0 },
    { x: 330, y: 480, scale: 0.25 , rotation: 0 },
    { x: -840, y: -100, scale: 0.12, rotation: 0 },
    { x: 135, y: -30, scale: 0.1, rotation: 90 },
    { x: -215 , y: 370, scale: 0.25, rotation: 0 },
    { x: -18, y: -430, scale: 0.2, rotation: 0 },  //7
    { x: 110, y: 455, scale: 0.3, rotation: 0 },
    {  x: -15, y: -275, scale: 0.15, rotation: 0 },
    { x: -690, y: -785, scale: 0.2, rotation: 0 },// 10
    { x: -235, y: 5, scale: 0.15, rotation: 0 },
    { x: 640, y: 307, scale: 0.2, rotation: 0 },
    { x: -383, y: -190, scale: 0.2, rotation: 0 },
    { x: -620, y: -157, scale: 0.15, rotation: 0 },// 14
    { x: 255, y: -170, scale: 0.13, rotation: 0 },
    { x: -497, y: -510, scale: 0.15, rotation: 0 },// 16
    { x: -223, y: -270, scale: 0.2, rotation: 0 },
    { x: 185, y: 45, scale: 0.3, rotation: 0 },// 18
    { x: -485, y: 185, scale: 0.2, rotation: 0 },
    { x: -135, y: -470, scale: 0.2, rotation: 0 },
    { x: 188, y: -320, scale: 0.13, rotation: 0 },// 21
    { x: -115, y: -20, scale: 0.1, rotation: -20 },
    { x: -325, y: -845, scale: 0.3, rotation: 55 },
    { x: -15, y: -140, scale: 0.13, rotation: 0 },
    { x: -525, y: -825, scale: 0.2, rotation: 0 },// 25
    { x: -735, y: -385, scale: 0.2, rotation: 0 },
  ],
  [
    { x: 0, y: 0, scale: 1.0, rotation: 0 }, // ЭТО МОЖНО НЕ ТРОГАТЬ
    { x: 475, y: 271, scale: 0.45, rotation: 0 }, // Это подарок 1 =)
    { x: 90, y: -760, scale: 0.15, rotation: 0 },
    { x: 135, y: -385, scale: 0.18, rotation: 0 },
    { x: -875, y: -165, scale: 0.12, rotation: 0 },
    { x: 625, y: -25, scale: 0.1, rotation: 90 },
    { x: -250, y: 140, scale: 0.25, rotation: 0 },
    { x: 7, y: -72, scale: 0.2, rotation: 0 },  //7
    { x: 95, y: 545, scale: 0.3, rotation: 0 },
    {  x: 640, y: -355, scale: 0.15, rotation: 0 },
    { x: -668, y: -696, scale: 0.2, rotation: 0 },// 10
    { x: -455, y: 85, scale: 0.15, rotation: 0 },
    { x: -580, y: -140, scale: 0.2, rotation: 0 },
    { x: -848, y: -504, scale: 0.2, rotation: 0 },
    { x: -740, y: -150, scale: 0.15, rotation: 0 },// 14
    { x: 650, y: -515, scale: 0.13, rotation: 0 },
    { x: -480, y: -520, scale: 0.15, rotation: 0 },// 16
    { x: -430, y: -130, scale: 0.2, rotation: 0 },
    { x: -490, y: -780, scale: 0.3, rotation: 0 },// 18
    { x: -740, y: 27, scale: 0.2, rotation: 0 },
    { x: 515, y: -415, scale: 0.2, rotation: 0 },
    { x: 625, y: -212, scale: 0.13, rotation: 0 },// 21
    { x: -755, y: -310, scale: 0.12, rotation: -20 },
    { x: 225, y: 265, scale: 0.25, rotation: 15 },
    { x: 625, y: 95, scale: 0.13, rotation: 0 },
    { x: -350, y: -765, scale: 0.2, rotation: 0 },// 25
    { x: -575, y: 325, scale: 0.2, rotation: 0 },
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
