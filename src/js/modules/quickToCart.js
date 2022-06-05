'use strict';
import { setLS } from "./storage/product-local";
import bag from "./bag";
export default function quickToCart({ btnModalSelector, headerModalSelector, priceModalSelector, imgModalSelector, countModalSelector, modalNotfSelector, modalNotfHeaderSelector }) {
    const btnModal = document.querySelector(btnModalSelector),
        headerModal = document.querySelector(headerModalSelector),
        priceModal = document.querySelector(priceModalSelector),
        imgModal = document.querySelector(imgModalSelector),
        countModal = document.querySelector(countModalSelector),
        modalNotf = document.querySelector(modalNotfSelector),
        modalNotfHeader = document.querySelector(modalNotfHeaderSelector);

    function addToCart() {
        if (btnModal) {
            btnModal.addEventListener('click', e => {
                e.preventDefault();
                const priceInt = priceModal.textContent.replace(/\$/i, '');
                const total = priceInt * ~~countModal.value;

                const product = {
                    header: headerModal.textContent,
                    price: priceInt,
                    img: imgModal.getAttribute('src'),
                    count: ~~countModal.value,
                    total: total
                };
                setLS(product);
                success(product);
                bag();
            });
        };
    };

    function success(product) {
        modalNotf.style.display = 'block';
        modalNotfHeader.textContent = `${product.header} has been added to your cart.`
        setTimeout(() => {
            modalNotf.style.display = 'none';
        }, 3000);
    };

    addToCart();
}