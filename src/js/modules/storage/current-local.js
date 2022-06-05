'use strict';

function setLS(obj) {
    localStorage.setItem('currentProduct', JSON.stringify(obj));
};

function getLS() {
    let arr = JSON.parse(localStorage.getItem('currentProduct'));
    return arr;
};

export { setLS, getLS };