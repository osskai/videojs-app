import videojs from "video.js"

let Button = videojs.getComponent("Button");
let OverlaySocialButton = videojs.extend(Button, {
    constructor: function (player, options) {
        Button.apply(this, arguments)
    },
    createEl: function (type, props) {
        props = videojs.mergeOptions({
            className: this.buildCSSClass(),
            tabindex: 0
        }, props);

        let el = videojs.dom.createEl('i', props, {
            'role': 'button',
            'aria-live': 'polite'
        });
        if (!props.innerHTML) {
            let contentEl = videojs.dom.createEl('div', {
                className: 'vjs-control-content'
            });
            let contentText = videojs.dom.createEl('span', {
                className: 'vjs-control-text'
            });
            videojs.dom.appendContent(contentText, this.options_.text);
            contentEl.appendChild(contentText);
            el.appendChild(contentEl);
        }

        return el;
    },
    buildCSSClass: function () {
        return 'vjs-share-icon fa fa-' + this.options_.icon + '-square fa-5x';
    }
});

let TwitterShare = videojs.extend(OverlaySocialButton, {
    constructor: function (player, options) {
        OverlaySocialButton.apply(this, arguments);
    },
    handleClick: function () {
        console.log("Twitter clicked");
    }
});

let FacebookShare = videojs.extend(OverlaySocialButton, {
    constructor: function (player, options) {
        OverlaySocialButton.apply(this, arguments);
    },
    handleClick: function () {
        console.log("Facebook clicked");
    }
});

let LinkedInShare = videojs.extend(OverlaySocialButton, {
    constructor: function (player, options) {
        OverlaySocialButton.apply(this, arguments);
    },
    handleClick: function () {
        console.log("LinkedIn clicked");
    }
});

export {
    TwitterShare, FacebookShare, LinkedInShare
}
