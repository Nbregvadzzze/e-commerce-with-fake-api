'use strict';
import { getLS } from "./storage/localstorage";

export default function bag(bagCount) {
    const bag = document.querySelector(bagCount),
        products = getLS();

    bag.textContent = products.length;

}