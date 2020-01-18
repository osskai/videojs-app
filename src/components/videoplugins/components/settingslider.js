import videojs from 'video.js'

let Component = videojs.getComponent("Component");
let SettingSlider = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    createEl: function () {
        const el = videojs.dom.createEl('div', {
            append: this.contentEl_,
            className: this.buildCSSClass()
        });

        let holder = videojs.dom.createEl('div', {
            className: 'vjs-setting-back ' + this.options_.subclass,
            innerHTML: `<span>${this.options_.label}</span>`
        });
        holder.onclick = () => {
            this.player_.trigger('settingbackclick');
        };
        el.appendChild(holder);
        // slider
        let slider = videojs.dom.createEl('div', {
            className: 'vjs-slider-holder'
        });
        let slider_bg = videojs.dom.createEl('div', {
            className: 'vjs-slider-background'
        });
        slider.appendChild(slider_bg);
        let slider_le = videojs.dom.createEl('div', {
            className: 'vjs-slider-level'
        });
        // mouse event
        let current_height = slider_le.style.height * 60;
        let init_height = 470;
        // up
        slider_bg.onmouseenter = (event) => {
            current_height = event.clientY;
        };
        slider_bg.onmousemove = (event) => {
            let delta_height = current_height - init_height;
            let percent = this.calculatePercent(delta_height);
            slider_le.style.height = percent + '%';

            current_height = event.clientY;
            console.log('move: ', current_height);
        };
        slider_bg.onmouseleave = (event) => {
            let delta_height = event.clientY - init_height;
            let percent = this.calculatePercent(delta_height);
            slider_le.style.height = percent + '%';
        };
        // down
        slider_le.onmouseenter = (event) => {
            current_height = event.clientY;
        };
        slider_le.onmousemove = (event) => {
            let delta_height = current_height - init_height;
            let percent = this.calculatePercent(delta_height);
            slider_le.style.height = percent + '%';

            current_height = event.clientY;
        };
        slider_le.onmouseleave = (event) => {
            let delta_height = event.clientY - init_height;
            let percent = this.calculatePercent(delta_height);
            slider_le.style.height = percent + '%';
        };

        slider.appendChild(slider_le);
        el.appendChild(slider);
        // reset
        let reset = videojs.dom.createEl('div', {
            className: 'vjs-slider-reset'
        });
        reset.onclick = () => {
            slider_le.style.height = '0%';
        };

        videojs.dom.appendContent(reset, 'RESET');
        el.appendChild(reset);

        return el;
    },
    buildCSSClass: function () {
        return 'vjs-submenu ' + this.options_.class;
    },
    calculatePercent: function (delta) {
        let percent = Math.abs(delta) * 100 / 70;
        if (percent > 75) {
            percent = 100;
        } else if (percent > 50) {
            percent = 75;
        } else if (percent > 25) {
            percent = 50;
        } else if (percent > 0){
            percent = 25;
        } else {
            percent = 0;
        }

        return percent;
    }
});

videojs.registerComponent("SettingSlider", SettingSlider);
export default SettingSlider;