'use strict';
import bag from "./bag";
import { setLS } from "./storage/product-local";
import { getLS } from "./storage/current-local";
export default function({ btnSelector, productHeader, productPrice, productImg, productCount, notfSelector, notfHeaderSelector, productShortImg }) {
    const btn = document.querySelector(btnSelector),
        header = document.querySelector(productHeader),
        price = document.querySelector(productPrice),
        img = document.querySelector(productImg),
        count = document.querySelector(productCount),
        notf = document.querySelector(notfSelector),
        shortImg = document.querySelector(productShortImg),
        notfHeader = document.querySelector(notfHeaderSelector);

    function showProduct() {
        let products = getLS();
        if (header && price && img) {
            header.textContent = products.cardName;
            price.textContent = `$${ products.cardPrice}`;
            img.setAttribute('src', products.cardImgSrc);

            for (let i = 0; i < 4; i++) {
                const short = document.createElement('img');
                short.setAttribute('src', products.cardImgSrc);
                shortImg.append(short);
            }
        }
    }

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
                bag();
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
    showProduct()

};