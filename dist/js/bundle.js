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
/* harmony import */ var _storage_localstorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage/localstorage */ "./js/modules/storage/localstorage.js");



function bag(bagCount) {
    const bag = document.querySelector(bagCount),
        products = (0,_storage_localstorage__WEBPACK_IMPORTED_MODULE_0__.getLS)();

    bag.textContent = products.length;

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
/* harmony import */ var _storage_localstorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage/localstorage */ "./js/modules/storage/localstorage.js");



function cart(cartContainerSelector, subTotalSelector, cartTotalSelector, dataSelector) {
    const cartContainer = document.querySelector(cartContainerSelector),
        subTotal = document.querySelectorAll(subTotalSelector),
        cartTotal = document.querySelectorAll(cartTotalSelector),
        data = document.querySelectorAll(dataSelector),
        products = (0,_storage_localstorage__WEBPACK_IMPORTED_MODULE_0__.getLS)();

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
                    (0,_storage_localstorage__WEBPACK_IMPORTED_MODULE_0__.removeLS)(header);

                    const dataItem = document.querySelectorAll('.cart__data-product-item');
                    dataItem.forEach(item => {
                        if (item.getAttribute('data-header') == dataHeader) {
                            item.remove();
                        };
                    });

                    const products = (0,_storage_localstorage__WEBPACK_IMPORTED_MODULE_0__.getLS)();
                    cartTotals(products);

                };
            });
        };
    };
    showProducts();
    removeProduct();
    cartTotals(products);
    dataHeaders(products);

};

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
/* harmony import */ var _storage_localstorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage/localstorage */ "./js/modules/storage/localstorage.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(btnSelector, productHeader, productPrice, productImg, productCount, notfSelector, notfHeaderSelector) {
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
                (0,_storage_localstorage__WEBPACK_IMPORTED_MODULE_0__.setLS)(product);
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

/***/ }),

/***/ "./js/modules/storage/localstorage.js":
/*!********************************************!*\
  !*** ./js/modules/storage/localstorage.js ***!
  \********************************************/
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







window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_product__WEBPACK_IMPORTED_MODULE_0__["default"])('.product__add a', '.product__header h1', '.product__price h1', '.product__slider-container img', '.product__add input', '#add__cart', '#add__cart p');
    (0,_modules_cart__WEBPACK_IMPORTED_MODULE_1__["default"])('.shopping tbody', '.cart__data-subtotal h4', '.cart__data-total h2', '.cart__data-product');
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])('#cart .tab', '#cart .tabControl', 'activeTab');
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])('#product__details .tab', '#product__details .tabControl', 'activeArea');
    (0,_modules_modals__WEBPACK_IMPORTED_MODULE_3__["default"])('#product__modal', '.card__quick');
    (0,_modules_bag__WEBPACK_IMPORTED_MODULE_4__["default"])('.bagCount');
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map