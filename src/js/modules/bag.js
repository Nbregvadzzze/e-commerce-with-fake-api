'use strict';
import { getLS } from "./storage/product-local";

export default function bag() {
    const bag = document.querySelector('.bagCount'),
        sum = document.querySelector('.bagSum'),
        products = getLS();

    bag.textContent = products.length;

    let allTotals = 0

    products.forEach(product => {
        allTotals += product.total;
    });

    sum.textContent = `$${allTotals.toFixed(2)}`;
}