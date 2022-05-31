window.addEventListener('DOMContentLoaded', () => {
    const navbar__dropdown = document.querySelector('.elements .navbar__dropdown');
    const navbar__left = document.querySelectorAll('.navbar__left>ul>li');

    navbar__left.forEach((item, index) => {
        if (item.classList.contains('elements')) {
            navbar__dropdown.style.cssText = `
            left: calc(-100% * ${index+1});
        `
        }
    })
})