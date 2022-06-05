'use strict';
export default function modals(modalSelector, showBtnSelector) {
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