'use strict';

function setSS(obj) {
    localStorage.setItem('currentProduct', JSON.stringify(obj));
};

function getSS() {
    let arr = JSON.parse(localStorage.getItem('currentProduct'));
    return arr;
};

export { setSS, getSS };