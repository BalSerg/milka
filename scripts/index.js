let gifts = [
    [
        {left: 360, top: 30 ,scale: 0.8, rotate: 0},
        {left: 65, top: 130, scale: 0.5, rotate: 0},
        {left: 675, top: 30 ,scale: 0.8, rotate: 0},
        {left: 700, top: 190, scale: 0.45, rotate: 0},
        {left: 650, top: 205, scale: 0.4, rotate: 90},
        {left: 190, top: 415, scale: 0.8, rotate: 0},
        {left: 630, top: 255, scale: 0.5, rotate: 0},
        {left: 250, top: 500, scale: 1, rotate: 0},
        {left: 385, top: 305, scale: 0.5, rotate: 0},
        {left: 60, top: 15, scale: 0.8, rotate: 0},
        {left: 255, top: 370, scale: 0.6, rotate: 0},
        {left: 235, top: 265, scale: 0.9, rotate: 0},
        {left: 600, top: 360, scale: 0.6, rotate: 0},
        {left: 105, top: 190, scale: 0.6, rotate: 0},
        {left: 385, top: 235, scale: 0.5, rotate: 0},
        {left: 190, top: 160, scale: 0.8, rotate: 0},
        {left: 280, top: 225, scale: 0.6, rotate: 0},
        {left: 290, top: -75, scale: 0.6, rotate: 45},
        {left: 120, top: 425, scale: 0.7, rotate: 0},
        {left: 320, top: 155, scale: 0.7, rotate: 0},
        {left: 650, top: 195, scale: 0.6, rotate: 0},
        {left: 325, top: 340, scale: 0.5, rotate: 0},
        {left: 125, top: -70, scale: 0.35, rotate: 45},
        {left: 380, top: 305 ,scale: 0.6, rotate: 0},
        {left: 620, top: 25 ,scale: 0.8, rotate: 0},
        {left: 165, top: -75, scale: 0.45, rotate: -80}
    ],
    [
        {left: 335, top: 50 ,scale: 0.8, rotate: 0},
        {left: 435, top: 95 ,scale: 0.5, rotate: 0},
        {left: 515, top: 545 ,scale: 0.8, rotate: 0},
        {left: 50, top: 300 ,scale: 0.5, rotate: 0},
        {left: 440, top: 340 ,scale: 0.45, rotate: 80},
        {left: 280, top: 490 ,scale: 0.8, rotate: 0},
        {left: 345, top: 175 ,scale: 0.5, rotate: 0},
        {left: 360, top: 550 ,scale: 1, rotate: 0},
        {left: 365, top: 245 ,scale: 0.45, rotate: 0},
        {left: 70, top: 40 ,scale: 0.7, rotate: 0},
        {left: 270, top: 370 ,scale: 0.7, rotate: 0},
        {left: 655, top: 475 ,scale: 0.8, rotate: 0},
        {left: 200, top: 245 ,scale: 0.6, rotate: 0},
        {left: 100, top: 295 ,scale: 0.6, rotate: 0},
        {left: 485, top: 280 ,scale: 0.6, rotate: 0},
        {left: 170, top: 160, scale: 0.8, rotate: 0},
        {left: 270, top: 225 ,scale: 0.6, rotate: 0},
        {left: 420, top: 325 ,scale: 0.55, rotate: 0},
        {left: 155, top: 415 ,scale: 0.6, rotate: 0},
        {left: 315, top: 170 ,scale: 0.6, rotate: 0},
        {left: 435, top: 220 ,scale: 0.6, rotate: 0},
        {left: 330, top: 340 ,scale: 0.45, rotate: 0},
        {left: 200, top: -70 ,scale: 0.4, rotate: 50},
        {left: 360, top: 300 ,scale: 0.5, rotate: 0},
        {left: 160, top: 20 ,scale: 0.8, rotate: 0},
        {left: 50, top: 95 ,scale: 0.5, rotate: -14}
    ],
    [
        {left: 550, top: 450 ,scale: 1.1, rotate: 0},
        {left: 385, top: 60 ,scale: 0.5, rotate: 0},
        {left: 435, top: 205 ,scale: 0.6, rotate: 0},
        {left: 30, top: 275 ,scale: 0.45, rotate: 0},
        {left: 630, top: 345 ,scale: 0.45, rotate: 80},
        {left: 280, top: 405 ,scale: 0.8, rotate: 0},
        {left: 345, top: 315 ,scale: 0.5, rotate: 0},
        {left: 390, top: 595 ,scale: 1, rotate: 15},
        {left: 640, top: 215 ,scale: 0.4, rotate: 0},
        {left: 85, top: 85 ,scale: 0.6, rotate: 0},
        {left: 170, top: 410 ,scale: 0.7, rotate: 0},
        {left: 165, top: 290,scale: 1, rotate: 0},
        {left: 0, top: 125 ,scale: 0.5, rotate: 0},
        {left: 45, top: 300 ,scale: 0.5, rotate: 0},
        {left: 620, top: 125 ,scale: 0.8, rotate: 0},
        {left: 180, top: 185 ,scale: 0.8, rotate: 0},
        {left: 175, top: 285 ,scale: 0.6, rotate: 0},
        {left: 140, top: -15 ,scale: 0.5, rotate: 0},
        {left: 40, top: 355 ,scale: 0.45, rotate: 0},
        {left: 575, top: 190 ,scale: 0.6, rotate: 0},
        {left: 615, top: 275 ,scale: 0.45, rotate: 0},
        {left: 70, top: 235 ,scale: 0.5, rotate: 0},
        {left: 445, top: 375 ,scale: 0.4, rotate: -10},
        {left: 620, top: 395 ,scale: 0.5, rotate: 0},
        {left: 240, top: 70 ,scale: 0.9, rotate: 0},
        {left: 115, top: 405 ,scale: 0.45, rotate: 0},
    ]
]

function getElement(selector) {
    return document.querySelector(selector);
}

function getArrayElements(selector) {
    return Array.from(document.querySelectorAll(selector));
}

window.onload = function () {
    let numCurrentRoom;// Номер текущей комнатыё

    const contentButtonsForGift = [
        [
            'ПЕРЕЙТИ В AR',
            'ВЕРНУТЬ В КОРОБКУ'
        ],
        [
            'callAr()',
            'let elCurrentGift = this.parentNode.parentNode; elCurrentGift.remove(); let start = String("gift gift").length; let indexItem = String(elCurrentGift.classList).substr(start); let tempGifts = Array.from(document.querySelectorAll(\".gifts__item\"));  tempGifts[indexItem-1].classList.remove(\"is-active\")'
        ]
    ]

    if(getElement('.js-form')) {
        let elForm = getElement('.js-form');
        let elButtonLk = getElement('.js-go-lk');

        elButtonLk.addEventListener('click', ()=> {
            elForm.classList.add('form-enter');
            elButtonLk.classList.add('is-hidden');
        })
    }

    function setBlockGifts() {//функция для равномерного выстраивания блоков с подарками в модалке
        if(getElement('.js-gifts')) {
            let elGifts = getElement('.gifts');
            elGifts.removeAttribute('style');
            let generalWidth = Number(screen.width) - (48 * 2) - (40 * 2);

            let elWidth = 128;
            const margins = 32;
            let countElements = Math.trunc(generalWidth / elWidth) - 1;//40-паддинг вунтренний
            alert(generalWidth + ' ' + countElements);

            let elGiftsWrapper = getElement('.js-gifts-content');
            if(screen.width <= 870) {
                generalWidth = Number(screen.width) - (16 * 2) - (48 * 2);
                countElements = Math.trunc(generalWidth / elWidth)-1;//48-паддинг вунтренний
                elGiftsWrapper.style.height = (screen.height - 250) + 'px';// 250 отсутп сверху для заголовка и крестика

            }
            if(screen.width <=600) {
                countElements = Math.trunc(generalWidth / elWidth);//48-паддинг вунтренний
            }
            let newWidth = margins * (countElements - 1) + countElements * elWidth;
            elGifts.style.width = newWidth + 'px';
            /*
            if(screen.width <= 520) {
                alert(1);
                countElements = 3;
                elWidth = (generalWidth - 4 * margins) / countElements;
                let arrNodesGifts = elGifts.childNodes;
                let arrGifts = [];
                for(let i=0; i<arrNodesGifts.length; i++) {
                    if(arrNodesGifts[i].nodeType === 1) {
                        arrGifts.push(arrNodesGifts[i]);
                    }
                }
                arrGifts.forEach((item) => {
                    item.style.width = elWidth + 'px';
                    item.style.height = elWidth + 'px';
                })

            }
            else {
                alert(2);

            }*/
        }
    }
    setBlockGifts();

    if(getElement('[class *= "js-modal"]')) {
        let arrButtonsCallModal = getArrayElements('[class *= "js-call-modal"]');
        let arrModals = getArrayElements('[class *= "js-modal"]');

        arrButtonsCallModal.forEach((item, index) => {
            item.addEventListener('click', () => {

                if(arrModals[index].classList.contains('is-hidden')) {
                    arrModals[index].classList.remove('is-hidden');
                }

                if(!arrModals[index].classList.contains('is-visibilit')) {
                    arrModals[index].classList.add('is-visibility');
                }
                if(arrModals[index].classList.contains('js-modal-lk')) {
                    let elLinkGift = getElement('.js-link-gift');
                    let elLinkChoice = getElement('.js-link-choice');

                    if(!getElement('.js-choice').classList.contains('is-hidden')) {
                        elLinkGift.classList.add('is-hidden');
                    }
                    else {
                        elLinkGift.classList.remove('is-hidden');
                    }

                    elLinkGift.addEventListener('click', () => {
                        getArrayElements('.js-c')
                        getElement('.js-modal-lk').classList.remove('is-visibility');
                        getElement('.js-modal-gifts').classList.add('is-visibility');

                    })

                    elLinkChoice.addEventListener('click', () => {
                        getElement('.js-modal-lk').classList.remove('is-visibility');
                        getElement('.js-choice').classList.remove('is-hidden');
                        getElement('.js-rooms').classList.add('is-hidden');
                        getElement(".js-range").parentNode.classList.add('is-hidden');

                        //Убрать в меню выбор подарков
                        let arrMenuItems = getElement('.js-menu').childNodes;
                        let arrItems = [];
                        for (let jtem of arrMenuItems) {
                            if (jtem.nodeType === 1) {
                                arrItems.push(jtem);
                            }
                        }
                        arrItems[0].classList.add('is-hidden');

                        //Удалить все из комнаты и убрать в коробку
                        let arrGifts = getElement('.js-current-room').childNodes;
                        for(let i=arrGifts.length-1; i >=0; i--) {//Обратный порядок перебора массива, чтоб в массиве элементы по индексу не смещались
                            arrGifts[i].remove();
                        }
                        let arrGiftsInBox = getElement('.js-gifts').childNodes;
                        for(let i=0; i < arrGiftsInBox.length; i++) {
                            if(arrGiftsInBox[i].nodeType === 1 && arrGiftsInBox[i].classList.contains('is-active')) {
                                arrGiftsInBox[i].classList.remove('is-active');
                            }
                        }
                    })
                }

            })
        })

        let arrCross = getArrayElements('.js-cross');
        arrCross.forEach((item) => {
            item.addEventListener('click', () => {
                item.parentNode.parentNode.classList.remove('is-visibility');
            })
        })
    }

    $('.js-choice-slick'). slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '24px',
        infinite: true,
    })


    //Функция создает подарок в комнате используя данные из gifts[], параметр num - это номер текущей комнаты
    function createBlock(num) {
        let elDiv = document.createElement('div');
        let styleValueDiv = 'left: ' + gifts[numCurrentRoom-1][num-1].left + 'px; top: ' + gifts[numCurrentRoom-1][num-1].top + 'px;';
        elDiv.classList.add('gift');
        elDiv.classList.add('gift' + num);
        elDiv.setAttribute('style', styleValueDiv);

        let elButtons = document.createElement('ul');
        elButtons.classList.add('gift-buttons');
        elButtons.classList.add('js-gift-buttons');
        elButtons.classList.add('is-hidden');
        for(let i=0; i<2; i++) {
            let elLi = document.createElement('li');
            let elSpan = document.createElement('span');
            elLi.classList.add('gift-buttons__item');
            elLi.setAttribute('onclick', contentButtonsForGift[1][i]);
            elLi.append(elSpan);
            elSpan.textContent = contentButtonsForGift[0][i];
            elButtons.append(elLi);
        }

        let elImg = document.createElement('img');
        let styleValueImg = 'transform: scale(' + gifts[numCurrentRoom-1][num-1].scale + ') rotate(' + gifts[numCurrentRoom-1][num-1].rotate + 'deg)';
        elImg.setAttribute('style', styleValueImg);
        elImg.src = 'images/gifts/gift' + num + '.png';
        elImg.setAttribute('onclick',
            'let tempButtons = this.parentNode.querySelector(\".js-gift-buttons\");'+
            'let start = String(\"gift gift\").length;' +
            'let currentNumberGift = String(this.parentNode.classList).substr(start);' +
            'let excludeClass = \"gift"\ + currentNumberGift;' +
            'let arrBlockButtons = document.querySelectorAll(\"\.js-gift-buttons\");'+
            'arrBlockButtons.forEach((item) => {if(!item.parentNode.classList.contains(excludeClass)) item.classList.add(\"is-hidden\")});'+
            'tempButtons.classList.toggle(\"is-hidden\");'
            );
        elDiv.append(elImg);
        elDiv.append(elButtons);
        getElement('.js-current-room').append(elDiv);
    }

    if(getElement('.js-rooms')) {
        let elChoice = getElement('.js-choice');
        let elRoom = getElement('.js-rooms');
        let elMenu = getElement('.js-menu');
        let elBlock = getElement('.js-range').parentNode;
        let elCurrentRoom = getElement('.js-current-room');

        const countRooms = 3;

        function goRoom(e) {
            elChoice.addEventListener('click', (e) => {
                let classes = (String(e.target.parentNode.classList));
                if (classes.includes('js-go')) {

                    elChoice.classList.add('is-hidden');//скрыть выбор комнат

                    let arrMenuItems = elMenu.childNodes;//показать в меню выбор подарков
                    for (let jtem of arrMenuItems) {
                        if (jtem.nodeType === 1) {
                            jtem.classList.remove('is-hidden');
                        }
                    }

                    for (let i = 1; i <= countRooms; i++) {//Проверяем и удаляем заранее у комнаты все классы room1 room2 и т.д.
                        if (elRoom.classList.contains('room' + i)) {
                            elRoom.classList.remove('room' + i);
                        }
                    }

                    elBlock.classList.remove('is-hidden');

                    let currentNumber = classes[classes.length - 1];
                    numCurrentRoom = currentNumber;

                    elRoom.classList.remove('is-hidden');
                    elRoom.classList.add('room' + currentNumber);

                    //elRoom.style.height = getElement('body').offsetHeight + 'px';
                    elBlock.style.width = (getElement('body').offsetHeight - topValue * 2) + 'px';//всему блоку с ползункои присваиваем высоту подолжки модалки т.к. она всегда по высоте во весь экран
                }
            })
        }
        goRoom();

        const topValue = 160;
        let elRange = getElement('.js-range');

        elCurrentRoom.style.transform = 'scale(' + elRange.value + '%)';

        elRange.addEventListener('input', () => {
            elCurrentRoom.style.transform = 'scale(' + elRange.value + '%)';
        })

        let arrButtons = getArrayElements("[class *= 'js-range-button']");//нажатие на кнопки + -
        arrButtons.forEach((item) => {
            item.addEventListener('click', (e) => {
                let enlarger = 0;
                if(String(item.classList).includes('top')){
                    enlarger = 20;
                }
                else {
                    enlarger = -20;
                }

                elRange.value = Number(elRange.value) + enlarger;

                let start;
                if((elCurrentRoom.style.transform).indexOf(1) !== -1) {
                    start = (elCurrentRoom.style.transform).indexOf('1');
                }
                else {
                    start = (elCurrentRoom.style.transform).indexOf('(2') +1;
                }

                let valueScale;
                valueScale =(elCurrentRoom.style.transform).substr(start, 3);
                if(valueScale.length < 3) {
                    valueScale = (elCurrentRoom.style.transform).substr(start, 1);
                }
                let cangedValueScale = valueScale*100 + enlarger;
                if((cangedValueScale >= 100) && (cangedValueScale <=200)) {
                    elCurrentRoom.style.transform = 'scale(' + cangedValueScale + '%)';
                }

            })
        })

        //Обращаемся к блоку с подарками в модалке , собираем там все подарки в массив и по клику на элемента модалку закрываем,
        //куда кликнули ставим класс is-active и рисуем подарок в комнате
        let blockGifts = getElement('.js-gifts');
        let gifts = blockGifts.childNodes;
        let arrItems = [];
        for(let jtem of gifts) {
            if(jtem.nodeType === 1) {
                arrItems.push(jtem);
            }
        }
        arrItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if(item.classList.contains('is-can-get') && !item.classList.contains('is-active')) {
                    item.classList.add('is-active');
                    getElement('.js-modal-gifts').classList.remove('is-visibility');
                    createBlock(index+1);
                }
            })
        })
    }


    window.onresize = function () {
        setBlockGifts();
    }
}


