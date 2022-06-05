'use strict';

export default function slider({ sliderTopSelector, sliderContainerSelector, sliderItemSelector, sliderNavSelector, navActive }) {
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