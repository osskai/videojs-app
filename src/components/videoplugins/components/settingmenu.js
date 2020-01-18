import videojs from 'video.js'

let Component = videojs.getComponent("Component");
// menu
let BaseMenu = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    addItem: function (component) {
        this.addChild(component);
    },
    createEl: function () {
        this.contentEl_ = videojs.dom.createEl('ul', {
            className: 'vjs-menu-content'
        });

        const el = videojs.dom.createEl('div', {
            append: this.contentEl_,
            className: this.buildCSSClass()
        });
        el.appendChild(this.contentEl_);

        return el;
    },
    buildCSSClass: function () {
        return 'vjs-submenu ' + this.options_.class;
    },
    show: function () {
        this.contentEl_.classList.remove('vjs-hidden');
    },
    hide: function () {
        this.contentEl_.classList.add('vjs-hidden');
    }
});

videojs.registerComponent("BaseMenu", BaseMenu);
export default BaseMenu;