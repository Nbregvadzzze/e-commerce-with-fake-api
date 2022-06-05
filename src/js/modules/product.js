'use strict';
import { setLS } from "./storage/localstorage";
export default function(btnSelector, productHeader, productPrice, productImg, productCount, notfSelector, notfHeaderSelector) {
    const btn = document.querySelector(btnSelector),
        header = document.querySelector(productHeader),
        price = document.querySelector(productPrice),
        img = document.querySelector(productImg),
        count = document.querySelector(productCount),
        notf = document.querySelector(notfSelector),
        notfHeader = document.querySelector(notfHeaderSelector);

    function addToCart() {
        if (btn) {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const priceInt = price.textContent.replace(/\$/i, '');
                const total = priceInt * ~~count.value;

                const product = {
                    header: header.textContent,
                    price: priceInt,
                    img: img.getAttribute('src'),
                    count: ~~count.value,
                    total: total
                };
                setLS(product);
                success(product);
            });
        };
    };

    function success(product) {
        notf.style.display = 'block';
        notfHeader.textContent = `${product.header} has been added to your cart.`
        setTimeout(() => {
            notf.style.display = 'none';
        }, 3000);
    };
    addToCart();
};