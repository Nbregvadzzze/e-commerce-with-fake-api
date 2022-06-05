'use strict';
export default function quickView({ quickImgSelector, quickHeaderSelector, quickPriceSelector, quickBtnSelector, cardImgSelector, cardPriceSelector, cardNameSelector }) {
    const quickImg = document.querySelector(quickImgSelector),
        quickHeader = document.querySelector(quickHeaderSelector),
        quickPrice = document.querySelector(quickPriceSelector),
        quickBtn = document.querySelectorAll(quickBtnSelector),
        cardImg = document.querySelectorAll(cardImgSelector),
        cardPrice = document.querySelectorAll(cardPriceSelector),
        cardName = document.querySelectorAll(cardNameSelector);

    function setQuickView() {

        if (quickImg && quickHeader && quickPrice) {
            quickBtn.forEach((item, i) => {
                item.addEventListener('click', () => {
                    quickImg.setAttribute('src', cardImg[i].getAttribute('src'));
                    quickHeader.textContent = cardName[i].textContent.trim();
                    quickPrice.textContent = cardPrice[i].textContent.trim();

                });
            });
        };

    };

    setQuickView();
};