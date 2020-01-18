import videojs from 'video.js'

const Component = videojs.getComponent("Component");

let PreviewWindow =  videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    createEl: function () {
        let container = this.miniPlayerContainer = videojs.dom.createEl('div', {
            className: 'vjs-notation-preview'
        });
        let wrapper = videojs.dom.createEl('div', {
            className: 'wrapper'
        });
        container.appendChild(wrapper);
        container.style.width = `${this.options_.size}px`;
        container.style.left = `${-this.options_.size / 2}px`;

        let p = videojs.dom.createEl('p', {
            className: 'vjs-notation-text',
        });
        p.style.fontSize = `${this.options_.fontSize}px`;
        p.style.lineHeight = `${this.options_.fontSize + 2}px`;
        wrapper.appendChild(p);

        let span = videojs.dom.createEl('span', {
            className: 'vjs-notation-time'
        });
        span.style.fontSize = `${this.options_.fontSize}px`;
        wrapper.appendChild(span);

        let miniPlayer = this.player_.el().querySelector('video').cloneNode(true);
        //console.log("miniPlayer:", miniPlayer);
        miniPlayer.className = 'vjs-mini-player';
        miniPlayer.removeAttribute('data-setup');
        miniPlayer.muted = true;
        miniPlayer.autoplay = false;
        wrapper.appendChild(miniPlayer);

        return container
    },
    show: function (currentT) {
        let container = this.miniPlayerContainer;
        container.style.opacity = 1;
        container.style.display = 'block';
        //
        let videoContainer = container.querySelector('video');
        if (videoContainer) {
            videoContainer.currentTime = currentT;
        }
    },
    hide: function () {
        let container = this.miniPlayerContainer;
        container.style.opacity = 0;
        container.style.display = 'none';
    },
    previewText: function (text) {
        let container = this.miniPlayerContainer;
        let textContainer = container.querySelector('p');
        if (textContainer) {
            textContainer.innerText = text;
        }
    },
    previewTime: function (time) {
        let container = this.miniPlayerContainer;
        let timeContainer = container.querySelector('span');
        if (timeContainer) {
            time = this.formatTime(time);
            timeContainer.innerText = time;
        }
    },
    calculateTime: function (event) {
        let duration = this.player_.duration();
        let rect = this.player_.controlBar.progressControl.el().getBoundingClientRect();
        let x = event.clientX;
        let w = rect.width;
        let l = rect.left;

        return (x - l)/w * duration;
    },
    calculatePosition: function (event) {
        let positionContainer = this.miniPlayerContainer;
        let progressContainer = this.player_.controlBar.progressControl.el();
        let pcRect = positionContainer.getBoundingClientRect();
        let pRect = progressContainer.getBoundingClientRect();
        let x = event.clientX;
        let l = x - pRect.left - pcRect.width/2;
        l = Math.min(l, pRect.width - pcRect.width);

        return Math.max(l, 0);
    },
    formatTime: function (seconds) {
        let s = parseInt(seconds, 10);
        let hours = Math.floor(s / 3600);
        let minutes = Math.floor((s - hours*3600)/60);
        let ss = s - hours*3600 - minutes*60;
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (ss < 10) {
            ss = '0' + ss;
        }

        return hours + ':' + minutes + ':' + ss;
    }
});

videojs.registerComponent("PreviewWindow", PreviewWindow);

export default PreviewWindow;