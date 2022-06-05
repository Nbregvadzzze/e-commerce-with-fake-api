'use strict';

export default function tabs(tabSelector, tabControlSelector, activeTab) {
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