'use strict';
import { setSS } from "./storage/current-local";
export default function getProduct({ cardImgSelector, cardPriceSelector, cardNameSelector }) {
    const cardImg = document.querySelectorAll(cardImgSelector),
        cardPrice = document.querySelectorAll(cardPriceSelector),
        cardName = document.querySelectorAll(cardNameSelector);

    function showCurrentProduct(event) {
        cardImg.forEach((img, i) => {
            img.addEventListener(event, e => {
                e.preventDefault();
                const newCardPrice = cardPrice[i].textContent.trim().replace(/\$/g, '');

                const currentProduct = {
                    cardImgSrc: cardImg[i].getAttribute('src'),
                    cardName: cardName[i].textContent.trim(),
                    cardPrice: +newCardPrice
                };

                setSS(currentProduct);
                location.href = 'product.html';
            });
        });
    };
    const eventArr = ['scroll', 'click'];

    eventArr.forEach(event => {
        showCurrentProduct(event);

    })
}