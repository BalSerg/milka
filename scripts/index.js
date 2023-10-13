const mobile_size = 820;
const desctop_size = 1100;
let defaultSizeRoom;
const defaultScale = 1.2
let first_visit = false;
let first_visit_new = false;
let time1_Ms= 0;
let time2_Ms= 0;
let valueTranslateX;
let valueTranslateY;
let isMoveRoom = false;
const availableWidth = document.documentElement.scrollWidth;
const availableHeight = document.documentElement.scrollHeight;

const giftsInModal = [
    {src: 'gift1', class: 'is-can-get'},
    {src: 'gift2', class: 'is-can-get'},
    {src: 'gift3', class: 'is-can-get'},
    {src: 'gift4', class: 'is-can-get'},
    {src: 'gift5', class: 'is-can-get'},
    {src: 'gift6', class: 'is-can-get'},
    {src: 'gift7', class: 'is-can-get'},
    {src: 'gift8', class: 'is-can-get'},
    {src: 'gift9', class: 'is-can-get'},
    {src: 'gift10', class: 'is-can-get'},
    {src: 'gift11', class: 'is-can-get'},
    {src: 'gift12', class: 'is-can-get'},
    {src: 'gift13'},
    {src: 'gift14'},
    {src: 'gift15'},
    {src: 'gift16'},
    {src: 'gift17'},
    {src: 'gift18'},
    {src: 'gift19'},
    {src: 'gift20'},
    {src: 'gift21'},
    {src: 'gift22'},
    {src: 'gift23'},
    {src: 'gift24'},
    {src: 'gift25'},
    {src: 'gift26'}
]

const giftsObj = [
    [
        {left: 360, top: 30 ,scale: 0.8, rotate: 0},
        {left: 65, top: 130, scale: 0.5, rotate: 0},
        {left: 675, top: 30 ,scale: 0.8, rotate: 0},
        {left: 700, top: 190, scale: 0.45, rotate: 0},
        {left: 650, top: 205, scale: 0.4, rotate: 90},
        {left: 190, top: 415, scale: 0.8, rotate: 0},
        {left: 630, top: 255, scale: 0.5, rotate: 0},
        {left: 250, top: 500, scale: 1, rotate: 0},
        {left: 385, top: 175, scale: 0.5, rotate: 0},
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
        {left: 650, top: 125, scale: 0.6, rotate: 0},
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

const giftsObj_mobile = [
    [
        {left: 165, top: 0, scale: 0.65, rotate: 0},
        {left: 30, top: 45, scale: 0.5, rotate: 0},
        {left: 305, top: -15, scale: 0.4, rotate: 0},
        {left: 325, top: 25, scale: 0.2, rotate: 0},
        {left: 295, top: 35, scale: 0.2, rotate: 90},
        {left: 70, top: 165, scale: 0.4, rotate: 0},
        {left: 300, top: 115, scale: 0.45, rotate: 0},
        {left: 150, top: 255, scale: 1, rotate: 0},
        {left: 170, top: 90, scale: 0.3, rotate: 0},
        {left: 15, top: -7, scale: 0.5, rotate: 0},
        {left: 110, top: 175, scale: 0.4, rotate: 0},
        {left: 105, top: 100, scale: 0.4, rotate: 0},
        {left: 283, top: 165, scale: 0.4, rotate: 0},
        {left: 40, top: 85, scale: 0.4, rotate: 0},
        {left: 168, top: 53, scale: 0.25, rotate: 0},
        {left: 70, top: 50, scale: 0.4, rotate: 0},
        {left: 125, top: 100, scale: 0.5, rotate: 0},
        {left: 135, top: -52, scale: 0.4, rotate: 35},
        {left: 45, top: 210, scale: 0.4, rotate: 0},
        {left: 138, top: 45, scale: 0.3, rotate: 0},
        {left: 300, top: 80, scale: 0.4, rotate: 0},
        {left: 140, top: 140, scale: 0.25, rotate: 0},
        {left: 60, top: -55, scale: 0.3, rotate: 45},
        {left: 170, top: 130, scale: 0.3, rotate: 0},
        {left: 280, top: -18, scale: 0.4, rotate: 0},
        {left: 80, top: -55, scale: 0.35, rotate: -75},
    ],
    [
        {left: 158, top: 10, scale: 0.65, rotate: 0},
        {left: 200, top: 30, scale: 0.4, rotate: 0},
        {left: 233, top: 240, scale: 0.45, rotate: 0},
        {left: 15, top: 113, scale: 0.25, rotate: 0},
        {left: 198, top: 138, scale: 0.2, rotate: 90},
        {left: 120, top: 205, scale: 0.4, rotate: 0},
        {left: 160, top: 75, scale: 0.4, rotate: 0},
        {left: 180, top: 255, scale: 0.65, rotate: 0},
        {left: 160, top: 92, scale: 0.25, rotate: 0},
        {left: 15, top: 2, scale: 0.5, rotate: 0},
        {left: 120, top: 175, scale: 0.5, rotate: 0},
        {left: 310, top: 205, scale: 0.4, rotate: 0},
        {left: 85, top: 110, scale: 0.4, rotate: 0},
        {left: 40, top: 135, scale: 0.4, rotate: 0},
        {left: 220, top: 105, scale: 0.3, rotate: 0},
        {left: 70, top: 50, scale: 0.4, rotate: 0},
        {left: 120, top: 100, scale: 0.5, rotate: 0},
        {left: 200, top: 140, scale: 0.4, rotate: 0},
        {left: 70, top: 195, scale: 0.4, rotate: 0},
        {left: 136, top: 55, scale: 0.3, rotate: 0},
        {left: 200, top: 95, scale: 0.3, rotate: 0},
        {left: 140, top: 140, scale: 0.25, rotate: 0},
        {left: 90, top: -53, scale: 0.35, rotate: 55},
        {left: 160, top: 125, scale: 0.25, rotate: 0},
        {left: 60, top: -18, scale: 0.4, rotate: 0},
        {left: 20, top: 25, scale: 0.4, rotate: 0},
    ],
    [
        {left: 265, top: 210, scale: 0.8, rotate: 0},
        {left: 175, top: 15, scale: 0.4, rotate: 0},
        {left: 195, top: 69, scale: 0.3, rotate: 0},
        {left: 10, top: 105, scale: 0.2, rotate: 0},
        {left: 290, top: 137, scale: 0.2, rotate: 90},
        {left: 120, top: 165, scale: 0.4, rotate: 0},
        {left: 165, top: 145, scale: 0.4, rotate: 0},
        {left: 180, top: 275, scale: 0.7, rotate: 0},
        {left: 290, top: 75, scale: 0.2, rotate: 0},
        {left: 35, top: 22, scale: 0.4, rotate: 0},
        {left: 70, top: 192, scale: 0.4, rotate: 0},
        {left: 70, top: 115, scale: 0.4, rotate: 0},
        {left: -5, top: 50, scale: 0.4, rotate: 0},
        {left: 15, top: 137, scale: 0.4, rotate: 0},
        {left: 285, top: 35, scale: 0.3, rotate: 0},
        {left: 70, top: 65, scale: 0.4, rotate: 0},

        {left: 80, top: 127, scale: 0.5, rotate: 0},
        {left: 75, top: -25, scale: 0.4, rotate: 0},
        {left: 15, top: 165, scale: 0.4, rotate: 0},
        {left: 262, top: 70, scale: 0.4, rotate: 0},
        {left: 285, top: 120, scale: 0.3, rotate: 0},
        {left: 15, top: 90, scale: 0.25, rotate: 0},
        {left: 200, top: 160, scale: 0.3, rotate: 20},
        {left: 285, top: 173, scale: 0.3, rotate: 0},
        {left: 110, top: -10, scale: 0.4, rotate: 0},
        {left: 50, top: 180, scale: 0.3, rotate: 0},
        {left: 70, top: 165, scale: 0.4, rotate: 0},
    ]
]

function getElement(selector) {
    const elem = document.querySelector(selector);
    if(!elem) {
        return;
    }
    return elem;
}

function getArrayElements(selector) {
    const array = Array.from(document.querySelectorAll(selector));
    if(array) {
        return Array.from(document.querySelectorAll(selector));
    }
}

window.onload = function () {
    let numCurrentRoom;// Номер текущей комнаты
    let newScale = 0; //Переменная для скейлинга в мобилке.

    const contentButtonsForGift = [
        [
            'ПЕРЕЙТИ В AR',
            'ВЕРНУТЬ В КОРОБКУ'
        ],
        [
            'js-call-ar',
            'js-del-gift'
        ]
    ]

    //Показ формыы на странице index.html
    if(getElement('.js-form')) {
        const elForm = getElement('.js-form');
        const elButtonLk = getElement('.js-go-lk');

        elButtonLk.addEventListener('click', ()=> {
            elForm.classList.add('form-enter');
            elButtonLk.classList.add('is-hidden');
        })
    }

    //функция для равномерного выстраивания блоков с подарками в модалке подарков
    function setBlockGifts() {
        if(getElement('.js-gifts')) {
            let elGifts = getElement('.js-gifts-content');
            elGifts.removeAttribute('style');
            let elWidth = 128;
            const margin = 32;
            const maxCount = 8;
            const borderWidth = 6;
            const scrollWidth = 4;
            let outerPadding = 48;
            let innerPadding = 40;
            if(screen.width <= 870) {
                outerPadding = 16;
                innerPadding = 48;
            }
            let availableWidthBlock = availableWidth - outerPadding * 2;
            let generalWidth = availableWidthBlock - innerPadding - (innerPadding - margin - scrollWidth) - borderWidth * 2;
            let countElements = Math.trunc(generalWidth / (elWidth + margin));
            if(countElements >= maxCount ) {
                countElements = maxCount;
            }
            let newWidth;
            if(navigator.userAgent.indexOf('Fire')){
                newWidth = margin * (countElements - 1) + countElements * elWidth + innerPadding * 2 + borderWidth * 2 + 8;
            }
            else {
                newWidth = margin * (countElements - 1) + countElements * elWidth + innerPadding * 2 + borderWidth * 2 + scrollWidth;
            }
            elGifts.style.width = newWidth + 'px';
        }
    }
    setBlockGifts();

    //сброс к начальным значениям стилей комнаты и ползунка
    function setDefaultValueRoomRange() {
        const elRange = getElement('.js-range');
        const elCurrentRoom = getElement('.js-current-room');
        elCurrentRoom.style = 'margin: auto; transform:scale(1.2)';
        elRange.value = '120';
    }

    //Открытие-закрытие модалок
    if(getElement('[class *= "js-modal"]')) {
        const arrButtonsCallModal = getArrayElements('[class *= "js-call-modal"]');
        const arrModals = getArrayElements('[class *= "js-modal"]');

        arrButtonsCallModal.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                if(e.target.classList.contains('js-call-lk-modal')) {
                    getElement('.js-call-lk-modal').classList.add('is-hidden');
                }

                if(arrModals[index].classList.contains('is-hidden')) {
                    arrModals[index].classList.remove('is-hidden');
                }

                if(!arrModals[index].classList.contains('is-visibility')) {
                    arrModals[index].classList.add('is-visibility');
                }
                if(arrModals[index].classList.contains('js-modal-lk')) {
                    const elLinkGift = getElement('.js-link-gift');
                    const elLinkChoice = getElement('.js-link-choice');

                    if(!getElement('.js-choice').classList.contains('is-hidden')) {
                        elLinkGift.classList.add('is-hidden');
                    }
                    else {
                        elLinkGift.classList.remove('is-hidden');
                    }

                    elLinkGift.addEventListener('click', () => {//Нажатие на пункт Мои подарки в Модалке ЛК
                        if(getElement('.js-gifts').childNodes.length === 0) {
                            createBlockInModslGift();
                        }
                        getElement('.js-modal-lk').classList.remove('is-visibility');
                        getElement('.js-modal-gifts').classList.add('is-visibility');

                    })

                    //Обработка нажатия на кнопку Сменить комнату
                    elLinkChoice.addEventListener('click', () => {
                        getElement('.js-modal-lk').classList.remove('is-visibility');
                        getElement('.js-choice').classList.remove('is-hidden');
                        getElement('.js-rooms').classList.add('is-hidden');
                        getElement(".js-range").parentNode.classList.add('is-hidden');

                        //Убрать в меню выбор подарков и  показать в меню кнопку личного кабинета
                        const arrMenuItems = getElement('.js-menu').childNodes;
                        let arrItems = [];
                        for (let jtem of arrMenuItems) {
                            if (jtem.nodeType === 1) {
                                arrItems.push(jtem);
                            }
                        }
                        arrItems[0].classList.add('is-hidden');//Кнопка подарки скрыта
                        arrItems[1].classList.remove('is-hidden');//Кнопак ЛК показана

                        //Удалить все из комнаты и убрать в коробку
                        let arrGifts = getElement('.js-current-room').childNodes;
                        for(let i=arrGifts.length-1; i >=0; i--) {//Обратный порядок перебора массива, чтоб в массиве элементы по индексу не смещались
                            arrGifts[i].remove();
                        }
                        const arrGiftsInBox = getElement('.js-gifts').childNodes;
                        for(let i=0; i < arrGiftsInBox.length; i++) {
                            if(arrGiftsInBox[i].nodeType === 1 && arrGiftsInBox[i].classList.contains('is-active')) {
                                arrGiftsInBox[i].classList.remove('is-active');
                            }
                        }
                        setDefaultValueRoomRange();
                    })
                }

                //Нажатие в меню кнопки Подарки
                if(e.target.parentNode.classList.contains('js-menu') && (!e.target.classList.contains('js-call-lk-modal'))){
                    if(getElement('.js-gifts').childNodes.length === 0) {
                        createBlockInModslGift();
                    }

                    if(getElement('.js-gift-buttons')) {//Скрываем блок кнопок околол подарка в комнате
                        getArrayElements('.js-gift-buttons').forEach((item) => {
                            if(!item.classList.contains('is-hidden')){
                                item.classList.add('is-hidden');
                            }
                        })
                    }

                    if(first_visit) {//Показ онбоардингов на модалке подарков
                        let elOnboardingGift = getElement('.js-onboarding-gift');
                        elOnboardingGift.classList.add('is-visibility');
                        elOnboardingGift.classList.add('z-index-max');
                        let elOnboardingWrapperGift = getElement('.js-onboarding-wrapper-gift');
                        elOnboardingWrapperGift.style.left = (availableWidth - getElement('.js-gifts').offsetWidth) / 2 + 'px';
                        if(screen.width > 820) {
                            elOnboardingWrapperGift.style.top = (availableHeight - getElement('.js-gifts-content').offsetHeight) / 2 + 40 + 6 + 'px';
                        }
                        else {
                            elOnboardingWrapperGift.style.top = (availableHeight - getElement('.js-gifts-content').offsetHeight) / 2 + 40 + 6 + 139 + 'px';
                        }
                        function showSecondOnboarding() {
                            elOnboardingGift.classList.add('is-added');
                            if(elOnboardingGift.classList.contains('is-added')){
                                setTimeout(() => {
                                    elOnboardingGift.classList.remove('is-visibility');
                                    elOnboardingGift.classList.remove('z-index-max');
                                    elOnboardingGift.classList.remove('is-added');
                                }, 1500);
                            }
                            return first_visit = false;
                        }
                        elOnboardingGift.addEventListener('click', () => {
                            showSecondOnboarding();
                        })
                        setTimeout(() => {
                            showSecondOnboarding();
                        },2500)
                    }


                }
            })
        })

        //Закрытие модалки по крестику
        const arrCross = getArrayElements('.js-cross');
        arrCross.forEach((item) => {
            item.addEventListener('click', () => {
                item.parentNode.parentNode.classList.remove('is-visibility');

                getElement('.js-call-lk-modal').classList.remove('is-hidden');
            })
        })

        //Закрытие модалок по кнопке Esc
        window.addEventListener('keypress', (e) => {
            if((e.key==='Escape'||e.key==='Esc'||e.keyCode===27)){
                arrModals.forEach((item) => {
                    item.classList.remove('is-visibility');
                })
            }
        });
    }

    //Карусель в модалке
    $('.js-choice-slick'). slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '24px',
        infinite: true,
    })

    //Создание блоков для подарков в модалке подарков
    function createBlockInModslGift() {
        const elModal = getElement('.js-gifts');
        for(let i=0; i<giftsInModal.length; i++) {
            let elGift = document.createElement('div');
            const createBlockGift =  function () {
                createBlock(i+1);
            }
            elGift.classList.add('gifts__item');
            if(giftsInModal[i].class) {//если есть класс в объекте json
                elGift.classList.add(giftsInModal[i].class);
                elGift.addEventListener("click", createBlockGift);
            }
            let elImg = document.createElement('img');
            elImg.src = `images/gifts/${giftsInModal[i].src}.png`;
            let elSpan = document.createElement('span');
            elSpan.textContent = i + 1;
            elGift.append(elSpan);
            elGift.append(elImg);
            elModal.append(elGift);
        }
    }

    function getIndexElementFromCollection(el) {
        let currentIndex = String(el.parentNode.parentNode.classList).substr(("gift gift".length));
        return currentIndex;
    }

    //Функция удаления подарка из комнаты, которая срабатывает на кнопке Удалить в коробку
    function deleteGiftFromRoom() {
        getArrayElements('.js-del-gift').forEach((item) => {
            item.addEventListener('click', function() {
                this.parentNode.parentNode.remove();
                const indexGift = getIndexElementFromCollection(this);
                const tempGifts = Array.from(document.querySelectorAll(".gifts__item"));
                tempGifts[indexGift-1].classList.remove("is-active");
            })
        })
    }

    //Функция вызова модалки AR но только на десктопе. В других разрешениях не нужна эта модалка
    function callModallAr() {
        if(screen.width >= desctop_size) {
            getArrayElements('.js-call-ar').forEach((item) => {
                item.addEventListener('click', function() {
                    const indexGift = getIndexElementFromCollection(this);
                    getElement('.js-qr-code').src = `images/qr-codes/qr-code${indexGift}.png`;
                    getElement('.js-qr').classList.add('is-visibility');
                })
            })
        }
    }

    //Функция перетаскивания подарков по комнате
    /*function moveGift() {
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
    }*/

    function moveGift() {
        const elCurrentRoom = getElement('.js-current-room');
        const arrGifts = elCurrentRoom.childNodes;
        let shiftXItem, shiftYItem;// Смещение размеров подарка по горзионтали и вертикали из-за scale
        let halfWidthItem, halfHeightItem; // Половина ширины и высоты подарка
        arrGifts.forEach((item) => {
            function moveAt(pageX, pageY) {// Функция которая подставляет подарок под курсор
                const scale = parseInt(getElement('.js-range').value, 10) / 100;
                halfWidthItem = item.offsetWidth * scale / 2;
                halfHeightItem = item.offsetHeight * scale / 2;
                shiftXItem = (item.offsetWidth * scale - item.offsetWidth) /2;
                shiftYItem = (item.offsetHeight * scale - item.offsetHeight) /2;

                if(!isMoveRoom){
                    valueTranslateX = 0;
                    valueTranslateY = 0;
                }
                console.log(pageX, Math.round(item.getBoundingClientRect().left));
                let newLeft = pageX - (availableWidth - elCurrentRoom.offsetWidth * scale) / 2 - shiftXItem - valueTranslateX;
                let newTop =  pageY - (availableHeight - elCurrentRoom.offsetHeight * scale) / 2  - shiftYItem - valueTranslateY;

                if (newLeft <= 0) {
                    item.style.left = 0 + 'px';
                }
                else if (newLeft > 820 - item.offsetWidth){
                    item.style.left = 820 - item.offsetWidth + 'px';
                }
                else {
                    item.style.left = newLeft + 'px';
                }

                if (newTop <= 0) {
                    item.style.top = 0 + 'px';
                }
                else if (newTop > 820 - item.offsetHeight){
                    item.style.top = 820 - item.offsetHeight + 'px';
                }
                else {
                    item.style.top = newTop + 'px';
                }
            }
            function onMouseMove(event) {
                if(item.classList.contains('is-dragged')) {
                    moveAt(event.pageX, event.pageY);
                }
            }
            item.addEventListener('mousedown', function (e){
                for(let gift of arrGifts) {
                    gift.classList.remove('is-dragged');
                }
                if(e.target.tagName !== 'SPAN' && this.classList.contains('gift')) {
                    e.stopPropagation();
                    item.classList.add('is-dragged');
                    elCurrentRoom.addEventListener('mousemove', onMouseMove);
                }
                let time1 = new Date;
                time1_Ms = time1.getTime();
                return time1_Ms;
            })
            item.addEventListener('mouseup', function () {
                item.classList.remove('is-dragged');
                item.removeEventListener('mousemove', onMouseMove);
                item.onmouseup = null;
                let time2 = new Date;
                time2_Ms = time2.getTime();
                return time2_Ms;
            });
            item.ondragstart = function () {
                return false;
            }
            document.documentElement.addEventListener('mouseup', () => {
                item.classList.remove('is-dragged');
                item.removeEventListener('mousemove', onMouseMove);
                item.onmouseup = null;
            })
        })
    }

    //Остлеживание изменения переменной isExist твечающей за наличие подарков в комнате и запуск нужных функций
    const existencGift = { _isGift : false }
    Object.defineProperty(existencGift, 'isExist', {
        get: function() { return this._isGift },
        set: function(value){
            this._isGift = value;
            moveGift();
            deleteGiftFromRoom();
            callModallAr();
        }
    })

    //Функция создает подарок в комнате используя данные из gifts[], параметр num - это номер текущей комнаты
    function createBlock(num) {
        let elDiv = document.createElement('div');
        let styleValueDiv;
        let styleValueImg;
        if(screen.width <= mobile_size) {
            styleValueDiv = `left: ${giftsObj_mobile[numCurrentRoom-1][num-1].left}px; top:${giftsObj_mobile[numCurrentRoom-1][num-1].top}px`;
            styleValueImg = `transform: scale(${giftsObj_mobile[numCurrentRoom-1][num-1].scale}) rotate(${giftsObj_mobile[numCurrentRoom-1][num-1].rotate}deg)`;
        }
        else {
            styleValueDiv = `left:${giftsObj[numCurrentRoom-1][num-1].left }px; top:${giftsObj[numCurrentRoom-1][num-1].top }px`;
            styleValueImg = `transform: scale(${giftsObj[numCurrentRoom-1][num-1].scale}) rotate(${giftsObj[numCurrentRoom-1][num-1].rotate}deg)`;
        }
        elDiv.classList.add('gift');
        elDiv.classList.add('gift' + num);
        elDiv.classList.add('z-index-max');
        elDiv.setAttribute('style', styleValueDiv);

        let elButtons = document.createElement('ul');
        elButtons.classList.add('gift-buttons');
        elButtons.classList.add('js-gift-buttons');
        elButtons.classList.add('is-hidden');
        for(let i=0; i<2; i++) {
            let elLi = document.createElement('li');
            let elSpan = document.createElement('span');
            elLi.classList.add('gift-buttons__item');
            elLi.classList.add(contentButtonsForGift[1][i]);
            elLi.append(elSpan);
            elSpan.textContent = contentButtonsForGift[0][i];
            elButtons.append(elLi);
        }
        let elImg = document.createElement('img');
        elImg.setAttribute('style', styleValueImg);
        elImg.classList.add('js-img');
        elImg.src = 'images/gifts/gift' + num + '.png';
        const showHideButtonsGift =  function () {
            if (time2_Ms - time1_Ms < 150) {//Проверка на то, что это именно щелчок ,а не нажатие и удрежание кнопки мыши
                const blockButtons = this.parentNode.querySelector('.js-gift-buttons');
                const start = 'gift gift'.length;
                const currentNumberGift = (this.parentNode.classList).toString().substr(start);
                const excludeClass = 'gift' + currentNumberGift;
                const arrBlockButtons = getArrayElements('.js-gift-buttons');
                arrBlockButtons.forEach((item) => {
                    if (!item.parentNode.classList.contains(excludeClass)) {
                        item.classList.add('is-hidden');
                    }
                    blockButtons.classList.toggle('is-hidden');
                    blockButtons.removeAttribute('style');
                    const leftCoordGift = Number((this.parentNode.style.left).substr(0, this.parentNode.style.left.indexOf('px')));
                    if(screen.width > mobile_size) {
                        leftCoordGift >= blockButtons.offsetWidth ? blockButtons.style.right = '100%' : blockButtons.style.left = '100%';
                    }
                    else {
                        if (leftCoordGift <= blockButtons.offsetWidth) {
                            blockButtons.style.left = '100%';
                            blockButtons.style.transformOrigin = 'left';
                        } else {
                            blockButtons.style.right = '100%';
                            blockButtons.style.transformOrigin = 'right'
                        }
                    }
                    const heightGift = Number((this.parentNode.style.top).substr(0, this.parentNode.style.top.indexOf("px")));
                    heightGift > 0 ? blockButtons.style.top = '0' : blockButtons.style.bottom = '0';
                })
            }
        }
        elImg.addEventListener("click", showHideButtonsGift);
        let elShadow = document.createElement('div');
        elShadow.classList.add('js-rooms-shadow');
        elShadow.classList.add('rooms-shadow');
        elDiv.append(elImg);
        elDiv.append(elButtons);
        elDiv.append(elShadow);
        getElement('.js-current-room').append(elDiv);
        getElement('.js-modal-gifts').classList.remove('is-visibility');
        existencGift.isExist = true; // Подарок в комнате создан и переменная isExist получает true. Изначально она false
        let timer = 0;//таймер показа тени под подарком. При первом визите он большой чтоб онбоардинг был виден, потом маленький
        if(first_visit_new) {
            timer = 2500;
        }
        else {
            timer = 800;
        }
        setTimeout(() => {
            elShadow.classList.add('is-hidden');
            elShadow.parentNode.classList.remove('z-index-max');
            first_visit_new = false;
        }, timer);
    }

    if(getElement('.js-rooms')) {
        let elChoice = getElement('.js-choice');
        let elRoom = getElement('.js-rooms');
        let elMenu = getElement('.js-menu');
        let elBlockRange = getElement('.js-range').parentNode;
        let elCurrentRoom = getElement('.js-current-room');
        const widthMobileRoom = 400;
        let forRoom = getElement('.room-content');

        function setRoomInAllWindow_mobile () {
            if(screen.width <= 820 && screen.width > 400) {
                newScale = screen.width/widthMobileRoom;
                forRoom.style.transform = 'scale(' + newScale  + ')';
            }
            else {
                forRoom.removeAttribute('style');
            }
            return newScale;
        }

        function callOnboarding(selector, time) {
            if(first_visit) {
                let elBoadring = getElement(selector);
                elBoadring.classList.add('is-visibility');
                elBoadring.addEventListener('click', () => {
                    elBoadring.classList.remove('is-visibility');
                })
                setTimeout(() => {
                    elBoadring.classList.remove('is-visibility');
                }, time)
            }
        }

        callOnboarding('.js-onboarding-choice', 2500);

        const countRooms = 3;

        //Функция движения комнаты
        function moveRoom() {
            function moveAt(pageX, pageY) {// Функция которая подставляет комнату под курсор
                let scale = parseInt(elRange.value, 10) / 100;
                elCurrentRoom.removeAttribute('style');
                valueTranslateX =  (pageX - elCurrentRoom.offsetWidth*scale/2);
                valueTranslateY =  (pageY - elCurrentRoom.offsetHeight*scale/2);
                elCurrentRoom.setAttribute('style', 'margin: initial; transform: scale(' + scale + ') translate(' + valueTranslateX + 'px,' + valueTranslateY + 'px)');
                isMoveRoom = true;
                return `${valueTranslateX} ${valueTranslateY} ${isMoveRoom}`;

            }
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
            elCurrentRoom.addEventListener('mousedown', function (){
                if((elCurrentRoom.offsetWidth * (Number(elRange.value) / 100) > availableWidth || elCurrentRoom.offsetHeight * (Number(elRange.value) / 100) > availableHeight) && String(this.classList).indexOf('current')) {
                    elCurrentRoom.addEventListener('mousemove', onMouseMove);
                }
            })
            elCurrentRoom.addEventListener('mouseup', function () {
                elCurrentRoom.removeEventListener('mousemove', onMouseMove);
                elCurrentRoom.onmouseup = null;
            });
            this.ondragstart = function () {
                return false;
            }
        }

        function goRoom() {
            elChoice.addEventListener('click', (e) => {
                if ((e.target.parentNode.classList).toString().includes('js-go') || ((e.target.parentNode.parentNode.classList).toString().includes('js-go'))) {

                    //Это все надо от для того что мы нажатие идет и на кнпоку Перейти и на весь блок
                    let classes1 = (e.target.parentNode.classList).toString();
                    let classes2 = (e.target.parentNode.parentNode.classList).toString();
                    let classes;
                    if (classes1.includes('js-go')){classes = classes1}
                    if (classes2.includes('js-go')){classes = classes2}

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

                    elBlockRange.classList.remove('is-hidden');//Показываем блок с полузнком

                    let currentNumber = classes[classes.length - 1];//Получаем номер текущей комнаты беря цифру у класса
                    numCurrentRoom = currentNumber;

                    elRoom.classList.remove('is-hidden');
                    elRoom.classList.add('room' + currentNumber);

                    elRoom.style.height = availableHeight + 'px';
                    if(!navigator.userAgent.includes('Fire')){
                        elBlockRange.style.width = (getElement('body').offsetHeight - topValue * 2) + 'px';//всему блоку с ползункои присваиваем высоту подолжки модалки т.к. она всегда по высоте во весь экран
                    }
                    else {
                        elBlockRange.classList.add('isMoz')
                        elBlockRange.style.height = (getElement('body').offsetHeight - topValue * 2) + 'px';//всему блоку с ползункои присваиваем высоту подолжки модалки т.к. она всегда по высоте во весь экран
                        elBlockRange.style.top = (availableHeight - elBlockRange.offsetHeight) / 2 + 'px'
                    }
                    setRoomInAllWindow_mobile();

                    if(screen.width <= 870) {
                        elMenu = getElement('.js-menu');
                        elMenu.style.width = screen.height + 'px';
                    }
                    if(first_visit) {
                        elBlockRange.classList.add('z-index-max');
                        setTimeout(() => {
                            elBlockRange.classList.remove('z-index-max');
                        }, 2500);
                        let elBoardingRange = getElement('.js-onboarding-range');
                        if(screen.width > 820) {
                            getElement(".js-onboarding-content").style.left = elBlockRange.getBoundingClientRect().x + elBlockRange.offsetHeight + 'px';
                            getElement(".js-onboarding-content").style.top = elBlockRange.getBoundingClientRect().y + 'px';
                            getElement(".js-onboarding-content-gift").style.left = elMenu.getBoundingClientRect().x - elMenu.offsetWidth + 'px';
                            getElement(".js-onboarding-content-gift").style.top = elMenu.getBoundingClientRect().y  + elMenu.offsetHeight +'px';
                            getElement(".js-onboarding-content-lk").style.left = elMenu.getBoundingClientRect().x - elMenu.offsetWidth/4 + 'px';
                            getElement(".js-onboarding-content-lk").style.top = elMenu.getBoundingClientRect().y + elMenu.offsetHeight + 50 + 'px';
                        }
                        let elBoardingMenuGift = getElement('.js-onboarding-menu-gift');
                        let elBoardingLk = getElement('.js-onboarding-lk');

                        let isClickBoardingGift = false;
                        let isClickBoardingLk = false;
                        elBoardingRange.classList.add('is-visibility');
                        elBoardingRange.addEventListener('click', () => {
                            elBoardingRange.classList.remove('is-visibility');
                            elBoardingMenuGift.classList.add('is-visibility');
                            elMenu.classList.add('z-index-max');
                        });
                        elBoardingMenuGift.addEventListener('click', () => {
                            elBoardingMenuGift.classList.remove('is-visibility');
                            elBoardingLk.classList.add('is-visibility');
                            isClickBoardingGift = true;
                        });
                        elBoardingLk.addEventListener('click', () => {
                            elBoardingLk.classList.remove('is-visibility');
                            elMenu.classList.remove('z-index-max');
                            isClickBoardingLk = true;
                        });
                        setTimeout(() => {
                            elBoardingRange.classList.remove('is-visibility');
                            if(!isClickBoardingGift) {
                                elBoardingMenuGift.classList.add('is-visibility');
                                elMenu.classList.add('z-index-max');
                            }
                        }, 2500);
                        setTimeout(() => {
                            elBoardingMenuGift.classList.remove('is-visibility')
                            if(!isClickBoardingLk) {
                                elBoardingLk.classList.add('is-visibility');
                            }
                        }, 5000);
                        setTimeout(() => {
                            elBoardingLk.classList.remove('is-visibility');
                            elMenu.classList.remove('z-index-max');
                        }, 7500);
                    }
                }
                moveRoom()
            })
        }
        goRoom();

        const topValue = 160;
        const elRange = getElement('.js-range');
        elCurrentRoom.style.transform = `scale(${parseInt(elRange.value, 10)/100})`; //при загрузке сначала сразу ставим scale 1.2
        elRange.addEventListener('input', () => {
            let scale = parseInt(elRange.value, 10) / 100;
            elCurrentRoom.style.transform = `scale(${scale})`;

            //Проверяем если есть смещение, то его добавляем в style
            if(isMoveRoom) {
                elCurrentRoom.style = `margin: initial; transform: scale(${parseInt(elRange.value, 10)/100}) translate(${valueTranslateX}px,${valueTranslateY}px)`;
            }
            else {
                elCurrentRoom.style.transform = `margin: auto; scale(${parseInt(elRange.value, 10)/100})`;
            }
        })

        let arrButtons = getArrayElements("[class *= 'js-range-button']");//нажатие на кнопки + -
        arrButtons.forEach((item) => {
            item.addEventListener('click', () => {
                let enlarger;
                let additionToEven;
                if(`${item.classList.toString()}`.includes('top')){
                    enlarger = 20;
                    additionToEven = 1;
                }
                else {
                    enlarger = -20;
                    additionToEven = -1;
                }

                if(elRange.value % 2 === 0) {
                    elRange.value = Number(elRange.value) + enlarger;
                }
                else {
                    elRange.value = Number(elRange.value) + enlarger + additionToEven;
                }

                let start;
                if((elCurrentRoom.style.transform).indexOf('1') !== -1) {//Проверка на 1, потому что 2.1 быть не может
                    start = (elCurrentRoom.style.transform).indexOf('(1')+1;
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
                    if(isMoveRoom) {
                        elCurrentRoom.style = 'margin: initial; transform: scale(' + elRange.value/100 + ') translate(' + valueTranslateX + 'px,' + valueTranslateY + 'px)';
                    }
                    else {
                        elCurrentRoom.style.transform = 'scale(' + elRange.value/100 + ')';
                    }
                }
            })
        });

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
                    if(first_visit_new) {
                        let elDiv = document.createElement('div');
                        let elContent = document.createElement('div');
                        elDiv.setAttribute('class', 'onboarding');
                        elDiv.classList.add('onboarding-room');
                        elDiv.classList.add('z-index-max');
                        let elSpan = document.createElement('span');
                        elSpan.textContent = 'Кликни, чтобы перейти в ar или убрать в коробку';
                        let elImg = document.createElement('img');
                        elImg.src = 'images/finger2.svg';
                        elContent.append(elSpan);
                        elContent.append(elImg);
                        elDiv.append(elContent)
                        if(elCurrentRoom.childNodes.length === 1){
                            elCurrentRoom.childNodes[0].append(elDiv)
                        }

                        setTimeout(() => {
                            elDiv.remove();
                        }, 2500)
                    }
                }
            })
        });

        window.onresize = function () {
            setBlockGifts();
            setRoomInAllWindow_mobile();
        }
    }
}
