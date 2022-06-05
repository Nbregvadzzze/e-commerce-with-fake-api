'use strict';

import services from '../services/services';
import getProduct from './getProduct';
import quickView from './quickView';
import modals from './modals';

export default function getAllData(cardContainerSelector, cardItemSelector) {
    const cardContainer = document.querySelector(cardContainerSelector),
        cardLoading = document.createElement('img');

    cardLoading.setAttribute('src', './src/img/loading/Loading_icon.gif')
    if (cardContainer) {
        cardContainer.style.cssText = `
        display: flex;
        justify-content: center;
    `;
        cardContainer.appendChild(cardLoading);

    }

    services('https://fakestoreapi.com/products')
        .then(data => {
            data.forEach(product => {
                const cardItem = document.createElement('div');
                cardItem.classList.add(cardItemSelector);

                cardItem.innerHTML = `
                <div class="card__img">
                <a href="product.html"><img src="${product.image}" alt=""></a>
                <div class="card__quick">
                    quick view
                </div>
                <div class="card__icons">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-bag-shopping"></i>
                </div>
                <div class="card__info-card pink">
                    new
                </div>
                </div>
                <div class="card__category">
                    women
                </div>
                <div class="card__name">
                ${product.title.slice(0,20)}
                </div>
                <div class="card__price">
                    <div class="card__new">
                        $${product.price}
                    </div>
                    <div class="card__old">
                        $160.99
                    </div>
                </div>
                <div class="card__review">
                    <div class="card__rev-icons">
                        <i class="fa-solid fa-star pink"></i>
                        <i class="fa-solid fa-star pink"></i>
                        <i class="fa-solid fa-star pink"></i>
                        <i class="fa-solid fa-star pink"></i>
                        <i class="fa-solid fa-star pink"></i>
                    </div>
                    <span>(8 reviews)</span>
                </div>
                
                `;
                cardLoading.remove();
                if (cardContainer) {
                    cardContainer.appendChild(cardItem);
                }


                getProduct({
                    cardImgSelector: '.card__container .card__img img',
                    cardPriceSelector: '.card__container .card__new',
                    cardNameSelector: '.card__container .card__name',
                });

                quickView({
                    quickImgSelector: '#product__modal img',
                    quickHeaderSelector: '#product__modal .product__header h1',
                    quickPriceSelector: '#product__modal .product__price h1',
                    quickBtnSelector: '.card__container .card__quick',
                    cardImgSelector: '.card__container .card__img img',
                    cardPriceSelector: '.card__container .card__new',
                    cardNameSelector: '.card__container .card__name'
                });

                modals('#product__modal', '.card__quick');


            });

        });


};