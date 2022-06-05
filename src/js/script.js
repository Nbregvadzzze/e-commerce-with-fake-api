'use strict';
import product from './modules/product';
import cart from './modules/cart';
import tabs from './modules/tabs';
import modals from './modules/modals';
import bag from './modules/bag';
import slider from './modules/slider';
import getProduct from './modules/getProduct';

window.addEventListener('DOMContentLoaded', () => {
    product({
        btnSelector: '.product__add a',
        productHeader: '.product__header h1',
        productPrice: '.product__price h1',
        productImg: '.product__slider-container img',
        productCount: '.product__add input',
        notfSelector: '#add__cart',
        notfHeaderSelector: '#add__cart p',
        productShortImg: '.product__left .product__img-short'
    });
    cart({
        cartContainerSelector: '.shopping tbody',
        subTotalSelector: '.cart__data-subtotal h4',
        cartTotalSelector: '.cart__data-total h2',
        dataSelector: '.cart__data-product'
    });

    tabs('#cart .tab', '#cart .tabControl', 'activeTab');
    tabs('#product__details .tab', '#product__details .tabControl', 'activeArea');
    modals('#product__modal', '.card__quick');
    bag();
    slider({
        sliderTopSelector: '.slider__top',
        sliderContainerSelector: '.slider__top-container',
        sliderItemSelector: '.slider__top-item',
        sliderNavSelector: '.slider__navigation',
        navActive: 'navActive'
    });

    getProduct({
        cardImgSelector: '.card__container .card__img img',
        cardPriceSelector: '.card__container .card__new',
        cardNameSelector: '.card__container .card__name'
    })

})