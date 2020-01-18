import videojs from 'video.js'
import ShareContainer from "@/components/videoplugins/components/share-container";
import SettingMenu from "@/components/videoplugins/components/settingmenu";
import SettingSlider from "@/components/videoplugins/components/settingslider";

let ClickableComponent = videojs.getComponent("ClickableComponent");
// base item
let BaseItem = videojs.extend(ClickableComponent, {
    constructor: function (player, options) {
        ClickableComponent.apply(this, arguments);
        this.selectable = options.selectable;
        this.isSelected_ = options.selected || false;
        this.selected(this.isSelected_);
        if (this.selectable) {
            this.setAttribute('role', 'radio');
        }
    },
    handleClick: function (event) {
        this.selected(true);
    },
    selected: function (selected) {
        if (this.selectable) {
            if (selected) {
                this.addClass('vjs-checked');
                this.isSelected_ = true;
            } else {
                this.removeClass('vjs-checked');
                this.isSelected_ = false;
            }
        }
    },
    createEl: function () {
        let container = videojs.dom.createEl('li', {
            className: this.buildCSSClass()
        });
        videojs.dom.appendContent(container, this.options_.label);

        return container;
    },
    buildCSSClass: function () {
        return this.options_.class + ' fa';
    }
});

videojs.registerComponent("BaseItem", BaseItem);

// setting item
let SettingItem = videojs.extend(ClickableComponent, {
    constructor: function (player, options) {
        ClickableComponent.apply(this, arguments);
    },
    createEl: function () {
        let container = videojs.dom.createEl('li', {
            className: 'vjs-setting-item',
        });
        videojs.dom.appendContent(container, this.options_.name);

        let holder = videojs.dom.createEl('span', {
            className: this.options_.icon
        });
        if (this.options_.label !== undefined) {
            videojs.dom.appendContent(holder, this.options_.label);
        }
        container.appendChild(holder);

        return container;
    },
});

videojs.registerComponent("SettingItem", SettingItem);

// share
let ShareItem = videojs.extend(SettingItem, {
    constructor: function (player, options) {
        SettingItem.apply(this, arguments);
    },
    handleClick: function(event) {
        event.stopImmediatePropagation();

        this.overlay = new ShareContainer(this.player_, {});
        this.overlay.exitButton.on('click', videojs.bind(this, this.cancelEvent));

        this.player_.addChild(this.overlay);
        this.overlay.show();

        this.player_.pause();
    },
    cancelEvent: function () {
        this.player_.removeChild(this.overlay);
        this.overlay.dispose();
        delete this.overlay;
    }
});

// speed
let SpeedItem = videojs.extend(SettingItem, {
    constructor: function (player, options) {
        SettingItem.apply(this, arguments);
        this.el().classList.add('vjs-menu-forward');
        // slider
        this.speed_slider = new SettingSlider(this.player_, {
            class: 'vjs-speed-menu',
            subclass: 'vjs-speed-return',
            label: 'Speed'
        });
        this.player_.on('settingbackclick', videojs.bind(this, this.hide));
    },
    handleClick: function (event) {
        event.stopImmediatePropagation();

        let setting_container = this.player_.getChild('SettingContainer');
        if (setting_container !== undefined) {
            let setting_menu = setting_container.el().getElementsByClassName('vjs-setting-home')[0];
            setting_menu.classList.add('vjs-hidden');
            // parent node
            this.menu_parent = setting_menu.parentNode;
            this.menu_parent.style.width = '66px';
            this.menu_parent.style.height = 'auto';

            this.menu_parent.appendChild(this.speed_slider.el());
        }
    },
    hide: function () {
        if (this.menu_parent !== undefined) {
            this.menu_parent.removeChild(this.speed_slider.el());
            this.menu_parent.children[0].classList.remove('vjs-hidden');
            this.menu_parent.style.width = '159px';
            this.menu_parent.style.height = '84px';
        }
    },
    dispose: function () {
        delete this.speed_slider;
    }
});

// resolution
let ResolutionItem = videojs.extend(SettingItem, {
    constructor: function (player, options) {
        SettingItem.apply(this, arguments);
        this.el().classList.add('vjs-menu-forward')
    },
    handleClick: function (event) {
        event.stopImmediatePropagation();

        // resolution
        this.resolution_menu = new SettingMenu(this.player_, {
            class: 'vjs-menu-resolution'
        });
        // add items
        let dir_item = new BaseItem(this.player_, {
            class: 'vjs-setting-back',
            label: 'Video'
        });
        console.log('dir_item: ', dir_item);
        dir_item.on('click', videojs.bind(this, this.hide));
        this.resolution_menu.addItem(dir_item);
        this.resolution_menu.addItem(new BaseItem(this.player_, {
            class: 'vjs-resolution',
            label: '360p',
            selectable: true
        }));
        this.resolution_menu.addItem(new BaseItem(this.player_, {
            class: 'vjs-resolution',
            label: '720p',
            selectable: true
        }));

        let setting_container = this.player_.getChild('SettingContainer');
        if (setting_container !== undefined) {
            let setting_menu = setting_container.el().getElementsByClassName('vjs-setting-home')[0];
            setting_menu.classList.add('vjs-hidden');
            // parent node
            this.menu_parent = setting_menu.parentNode;
            this.menu_parent.style.width = '68px';
            this.menu_parent.style.height = 'auto';

            this.menu_parent.appendChild(this.resolution_menu.el());
        }
    },
    hide: function () {
        if (this.menu_parent !== undefined) {
            this.menu_parent.removeChild(this.resolution_menu.el());
            this.menu_parent.children[0].classList.remove('vjs-hidden');
            this.menu_parent.style.width = '159px';
            this.menu_parent.style.height = '84px';
        }
        delete this.resolution_menu;
    }
});

export {ShareItem, SpeedItem, ResolutionItem};
