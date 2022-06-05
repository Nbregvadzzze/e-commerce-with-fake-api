/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/bag.js":
/*!***************************!*\
  !*** ./js/modules/bag.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bag)
/* harmony export */ });
/* harmony import */ var _storage_product_local__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage/product-local */ "./js/modules/storage/product-local.js");



function bag() {
    const bag = document.querySelector('.bagCount'),
        sum = document.querySelector('.bagSum'),
        products = (0,_storage_product_local__WEBPACK_IMPORTED_MODULE_0__.getLS)();

    bag.textContent = products.length;

    let allTotals = 0

    products.forEach(product => {
        allTotals += product.total;
    });

    sum.textContent = `$${allTotals.toFixed(2)}`;
}

/***/ }),

/***/ "./js/modules/cart.js":
/*!****************************!*\
  !*** ./js/modules/cart.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cart)
/* harmony export */ });
/* harmony import */ var _storage_product_local__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage/product-local */ "./js/modules/storage/product-local.js");
/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bag */ "./js/modules/bag.js");




function cart({ cartContainerSelector, subTotalSelector, cartTotalSelector, dataSelector }) {
    const cartContainer = document.querySelector(cartContainerSelector),
        subTotal = document.querySelectorAll(subTotalSelector),
        cartTotal = document.querySelectorAll(cartTotalSelector),
        data = document.querySelectorAll(dataSelector),
        products = (0,_storage_product_local__WEBPACK_IMPORTED_MODULE_0__.getLS)();

    function showCart() {
        products.forEach((product, i) => {
            if (cartContainer) {
                cartContainer.innerHTML += `
            <tr data-header=${i}>
                <td class="product__name"><img src="${product.img}" alt=""><a href="#">${product.header}</a></td>
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
                    (0,_storage_product_local__WEBPACK_IMPORTED_MODULE_0__.removeLS)(header);

                    const dataItem = document.querySelectorAll('.cart__data-product-item');
                    dataItem.forEach(item => {
                        if (item.getAttribute('data-header') == dataHeader) {
                            item.remove();
                        };
                    });

                    const products = (0,_storage_product_local__WEBPACK_IMPORTED_MODULE_0__.getLS)();
                    cartTotals(products);
                    (0,_bag__WEBPACK_IMPORTED_MODULE_1__["default"])();
                };
            });
        };
    };
    showCart();
    removeProduct();
    cartTotals(products);
    dataHeaders(products);

};

/***/ }),

/***/ "./js/modules/getProduct.js":
/*!**********************************!*\
  !*** ./js/modules/getProduct.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getProduct)
/* harmony export */ });
/* harmony import */ var _storage_current_local__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage/current-local */ "./js/modules/storage/current-local.js");


function getProduct({ cardImgSelector, cardPriceSelector, cardNameSelector }) {
    const cardImg = document.querySelectorAll(cardImgSelector),
        cardPrice = document.querySelectorAll(cardPriceSelector),
        cardName = document.querySelectorAll(cardNameSelector);

    function showCurrentProduct(event) {
        cardImg.forEach((img, i) => {
            img.addEventListener(event, e => {
                e.preventDefault();
                const newCardPrice = cardPrice[i].textContent.trim().replace(/\$/g, '');

                const currentProduct = {
                    cardImgSrc: cardImg[i].getAttribute('src'),
                    cardName: cardName[i].textContent.trim(),
                    cardPrice: +newCardPrice
                };

                (0,_storage_current_local__WEBPACK_IMPORTED_MODULE_0__.setSS)(currentProduct);
                location.href = 'product.html';
            });
        });
    };
    const eventArr = ['scroll', 'click'];

    eventArr.forEach(event => {
        showCurrentProduct(event);

    })
}

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modals)
/* harmony export */ });

function modals(modalSelector, showBtnSelector) {
    const modal = document.querySelector(modalSelector),
        showBtn = document.querySelectorAll(showBtnSelector);


    if (showBtn) {
        showBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                showModal();
            });
        });
    };
    window.addEventListener('keydown', e => {
        if (e.key == 'Escape') {
            hideModal();
        }
    })
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target == modal) {
                hideModal();
            };
        });
    };

    function showModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

/***/ }),

/***/ "./js/modules/product.js":
/*!*******************************!*\
  !*** ./js/modules/product.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bag */ "./js/modules/bag.js");
/* harmony import */ var _storage_product_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage/product-local */ "./js/modules/storage/product-local.js");
/* harmony import */ var _storage_current_local__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage/current-local */ "./js/modules/storage/current-local.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__({ btnSelector, productHeader, productPrice, productImg, productCount, notfSelector, notfHeaderSelector, productShortImg }) {
    const btn = document.querySelector(btnSelector),
        header = document.querySelector(productHeader),
        price = document.querySelector(productPrice),
        img = document.querySelector(productImg),
        count = document.querySelector(productCount),
        notf = document.querySelector(notfSelector),
        shortImg = document.querySelector(productShortImg),
        notfHeader = document.querySelector(notfHeaderSelector);

    function showProduct() {
        let products = (0,_storage_current_local__WEBPACK_IMPORTED_MODULE_2__.getSS)();
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
                (0,_storage_product_local__WEBPACK_IMPORTED_MODULE_1__.setLS)(product);
                success(product);
                (0,_bag__WEBPACK_IMPORTED_MODULE_0__["default"])();
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

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });


function slider({ sliderTopSelector, sliderContainerSelector, sliderItemSelector, sliderNavSelector, navActive }) {
    const sliderTop = document.querySelector(sliderTopSelector),
        sliderContainer = document.querySelector(sliderContainerSelector),
        sliderItem = document.querySelectorAll(sliderItemSelector),
        sliderNav = document.querySelector(sliderNavSelector);

    let width,
        offset = 0;

    if (sliderTop && sliderContainer) {
        width = window.getComputedStyle(sliderTop).width;
        sliderContainer.style.cssText = `
        display: flex;
        width: calc(100% * ${sliderItem.length});
        transition: all 200ms;
   `;
        sliderTop.style.overflow = 'hidden';
    }


    const dot = document.createElement('ol');
    dot.style.cssText = `
        display: flex;
        gap: 12px;
    `;
    for (let i = 0; i < sliderItem.length; i++) {
        const li = document.createElement('li');
        li.style.cssText = `
            transition: all 200ms;
            cursor: pointer;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: $c-white;
            opacity: .5;
        `;

        li.setAttribute('data-slider', i);
        if (i == 0) {
            li.classList.add(navActive);
        }
        dot.append(li);
        sliderNav.appendChild(dot);

    };


    dot.addEventListener('click', e => {
        const target = e.target;
        if (target.matches('li')) {
            offset = +width.slice(0, width.length - 2) * target.getAttribute('data-slider');
            currentNav();
            target.classList.add(navActive);
            sliderContainer.style.transform = `translateX(-${offset}px)`;
        };
    });


    function currentNav() {
        for (let i = 0; i < dot.children.length; i++) {
            dot.children[i].classList.remove('navActive');
        };
    }

}

/***/ }),

/***/ "./js/modules/storage/current-local.js":
/*!*********************************************!*\
  !*** ./js/modules/storage/current-local.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSS": () => (/* binding */ getSS),
/* harmony export */   "setSS": () => (/* binding */ setSS)
/* harmony export */ });


function setSS(obj) {
    localStorage.setItem('currentProduct', JSON.stringify(obj));
};

function getSS() {
    let arr = JSON.parse(localStorage.getItem('currentProduct'));
    return arr;
};



/***/ }),

/***/ "./js/modules/storage/product-local.js":
/*!*********************************************!*\
  !*** ./js/modules/storage/product-local.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLS": () => (/* binding */ getLS),
/* harmony export */   "removeLS": () => (/* binding */ removeLS),
/* harmony export */   "setLS": () => (/* binding */ setLS)
/* harmony export */ });


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




/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs)
/* harmony export */ });


function tabs(tabSelector, tabControlSelector, activeTab) {
    const tabs = document.querySelectorAll(tabSelector),
        tabsControl = document.querySelectorAll(tabControlSelector);

    if (tabsControl) {
        tabsControl.forEach((item, i) => {
            item.addEventListener('click', e => {
                e.preventDefault();
                if (e.target.classList.contains('tabControl')) {
                    showTabs(i);
                };
            });
        });
    };

    function showTabs(i = 0) {
        hideTabs();
        if (tabs[i]) {
            if (!tabs[i].classList.contains('order')) {
                tabs[i].style.display = 'flex';
            } else {
                tabs[i].style.display = 'block';
            };

            tabsControl[i].classList.add(activeTab);
        };
    };

    function hideTabs() {
        tabs.forEach(tab => {
            tab.classList.remove(activeTab);
            tab.style.display = 'none';
        });

        tabsControl.forEach(item => {
            item.classList.remove(activeTab);
        });
    };

    hideTabs();
    showTabs();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/product */ "./js/modules/product.js");
/* harmony import */ var _modules_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cart */ "./js/modules/cart.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_bag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/bag */ "./js/modules/bag.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_getProduct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/getProduct */ "./js/modules/getProduct.js");









window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_product__WEBPACK_IMPORTED_MODULE_0__["default"])({
        btnSelector: '.product__add a',
        productHeader: '.product__header h1',
        productPrice: '.product__price h1',
        productImg: '.product__slider-container img',
        productCount: '.product__add input',
        notfSelector: '#add__cart',
        notfHeaderSelector: '#add__cart p',
        productShortImg: '.product__left .product__img-short'
    });
    (0,_modules_cart__WEBPACK_IMPORTED_MODULE_1__["default"])({
        cartContainerSelector: '.shopping tbody',
        subTotalSelector: '.cart__data-subtotal h4',
        cartTotalSelector: '.cart__data-total h2',
        dataSelector: '.cart__data-product'
    });

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])('#cart .tab', '#cart .tabControl', 'activeTab');
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])('#product__details .tab', '#product__details .tabControl', 'activeArea');
    (0,_modules_modals__WEBPACK_IMPORTED_MODULE_3__["default"])('#product__modal', '.card__quick');
    (0,_modules_bag__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        sliderTopSelector: '.slider__top',
        sliderContainerSelector: '.slider__top-container',
        sliderItemSelector: '.slider__top-item',
        sliderNavSelector: '.slider__navigation',
        navActive: 'navActive'
    });

    (0,_modules_getProduct__WEBPACK_IMPORTED_MODULE_6__["default"])({
        cardImgSelector: '.card__container .card__img img',
        cardPriceSelector: '.card__container .card__new',
        cardNameSelector: '.card__container .card__name'
    })

})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map