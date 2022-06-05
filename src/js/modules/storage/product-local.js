'use strict';

function getLS() {
    let arr;
    if (localStorage.getItem('product') === null) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem('product'))
    };

    return arr;
};

function setLS(obj) {
    let arr = getLS();
    let result = controlAsset(obj);
    if (result) {
        arr.push(obj);
        localStorage.setItem('product', JSON.stringify(arr));
    };

};

function controlAsset(obj) {
    let arr = getLS();
    let result = true;
    arr.forEach((item, i) => {
        if (item.header == obj.header) {
            arr[i].count += obj.count;
            arr[i].total += obj.count * obj.price;
            result = false;
            localStorage.setItem('product', JSON.stringify(arr));
        };
    });
    return result;
};

function removeLS(header) {
    let arr = getLS();
    arr.forEach((item, i) => {
        if (item.header == header) {
            arr.splice(i, 1);
        };
    });

    localStorage.setItem('product', JSON.stringify(arr));

};


export { setLS, getLS, removeLS };