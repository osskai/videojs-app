import videojs from 'video.js'
import BaseMenu from "@/components/videoplugins/components/settingmenu";
import {ResolutionItem, ShareItem, SpeedItem} from "@/components/videoplugins/components/settingitems";

let Component = videojs.getComponent("Component");
// container
let SettingContainer = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    createEl: function () {
        let container = videojs.dom.createEl('div', {
            className: 'vjs-menu-settings vjs-hidden'
        });
        let holder = videojs.dom.createEl('div', {
            className: 'vjs-menu-div vjs-setting-div'
        });
        holder.style.width = '159px';
        holder.style.height = '84px';
        // setting menu
        const setting_menu = new BaseMenu(this.player_, {
            class: 'vjs-setting-home'
        });
        // share item
        setting_menu.addItem(new ShareItem(this.player_, {
            icon: 'fa fa-share',
            name: 'Share'
        }));
        // speed item
        setting_menu.addItem(new SpeedItem(this.player_, {
            icon: '',
            name: 'Speed',
            label: 'Normal'
        }));
        // resolution item
        setting_menu.addItem(new ResolutionItem(this.player_, {
            icon: '',
            name: 'Resolution',
            label: '360p'
        }));
        holder.appendChild(setting_menu.el());
        container.appendChild(holder);
        // console.log("container: ", container);

        return container;
    },
    show: function () {
        this.el().classList.remove('vjs-hidden');
    },
    hide: function () {
        this.el().classList.add('vjs-hidden');
    }
});

videojs.registerComponent("SettingContainer", SettingContainer);
export default SettingContainer;