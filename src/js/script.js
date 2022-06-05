'use strict';
import product from './modules/product';
import cart from './modules/cart';
import tabs from './modules/tabs';
import modals from './modules/modals';

window.addEventListener('DOMContentLoaded', () => {
    product('.product__add a', '.product__header h1', '.product__price h1', '.product__slider-container img', '.product__add input', '#add__cart', '#add__cart p');
    cart('.shopping tbody', '.cart__data-subtotal h4', '.cart__data-total h2', '.cart__data-product');
    tabs('#cart .tab', '#cart .tabControl', 'activeTab');
    tabs('#product__details .tab', '#product__details .tabControl', 'activeArea');
    modals('#product__modal', '.card__quick')
})