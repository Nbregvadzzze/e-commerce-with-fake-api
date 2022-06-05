'use strict';
import { getLS, removeLS } from "./storage/localstorage";
import bag from "./bag";

export default function cart({ cartContainerSelector, subTotalSelector, cartTotalSelector, dataSelector }) {
    const cartContainer = document.querySelector(cartContainerSelector),
        subTotal = document.querySelectorAll(subTotalSelector),
        cartTotal = document.querySelectorAll(cartTotalSelector),
        data = document.querySelectorAll(dataSelector),
        products = getLS();

    function showProducts() {
        products.forEach((product, i) => {
            if (cartContainer) {
                cartContainer.innerHTML += `
            <tr data-header=${i}>
                <td class="product__name"><img src="src/img/cart/2.jpg" alt=""><a href="#">${product.header}</a></td>
                <td><span>$${product.price}</span></td>
                <td><span>${product.count}</span></td>
                <td class="product__total"> <span>$${product.total.toFixed(2)}</span></td>
                <td class="product__delete"><span>x</span></td>
            </tr>
            `
            };
        });
    };

    function allProduct(products) {
        let allTotals = 0,
            allHeaders = [];

        products.forEach(product => {
            allTotals += product.total;
            allHeaders.push(product.header + ` x${product.count}`);
        });
        return {
            totals: allTotals,
            headers: allHeaders
        };
    };

    function dataHeaders(getLS) {
        const products = allProduct(getLS);

        products.headers.forEach((headers, i) => {
            data.forEach(data => {
                data.innerHTML += `
                <div data-header=${i} class="cart__data-product-item">
                    <span>${headers}</span>
                </div> `
            });
        });
    };

    function cartTotals(getLS) {
        const products = allProduct(getLS);

        subTotal.forEach(subTotal => {
            subTotal.textContent = `$${products.totals.toFixed(2)}`
        });

        cartTotal.forEach(cartTotal => {
            cartTotal.textContent = `$${products.totals.toFixed(2)}`
        });


    };



    function removeProduct() {
        if (cartContainer) {
            cartContainer.addEventListener('click', e => {
                if (e.target.textContent === 'x') {
                    const parent = e.target.parentElement.parentElement;
                    const header = parent.children[0].children[1].textContent;
                    const dataHeader = parent.getAttribute('data-header');
                    parent.remove();
                    removeLS(header);

                    const dataItem = document.querySelectorAll('.cart__data-product-item');
                    dataItem.forEach(item => {
                        if (item.getAttribute('data-header') == dataHeader) {
                            item.remove();
                        };
                    });

                    const products = getLS();
                    cartTotals(products);
                    bag();
                };
            });
        };
    };
    showProducts();
    removeProduct();
    cartTotals(products);
    dataHeaders(products);

};