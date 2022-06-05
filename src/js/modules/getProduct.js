'use strict';
import { setLS } from "./storage/current-local";
export default function getProduct({ cardImgSelector, cardPriceSelector, cardNameSelector }) {
    const cardImg = document.querySelectorAll(cardImgSelector),
        cardPrice = document.querySelectorAll(cardPriceSelector),
        cardName = document.querySelectorAll(cardNameSelector);

    function showCurrentProduct(selector) {

        selector.forEach((item, i) => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const newCardPrice = cardPrice[i].textContent.trim().replace(/\$/g, '');

                const currentProduct = {
                    cardImgSrc: cardImg[i].getAttribute('src'),
                    cardName: cardName[i].textContent.trim(),
                    cardPrice: +newCardPrice
                };

                setLS(currentProduct);
                location.href = 'product.html';
            });
        });


    };

    showCurrentProduct(cardImg);
}