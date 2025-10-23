import './colors';
window.cpbm = window.cpbm || {};

window.cpbm.hero = {
    init: function () {
        this.header = document.querySelector('header#document-header');
        this.hero = document.querySelector('.hero');
        this.resize();
        this.listen();
    },
    listen: function () {
        window.addEventListener('resize', this.resize.bind(this));
        window.addEventListener('scroll', this.resize.bind(this));
    },
    resize: function () {
        if (!this.header.classList.contains('is-sticky')) {
            this.hero.style.setProperty('--header-height', this.header.offsetHeight + 'px');
        }
    }
}

window.cpbm.hero.init();