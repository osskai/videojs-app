import videojs from 'video.js'
import ShareContainer from "@/components/videoplugins/components/share-container";

let Button = videojs.getComponent("Button");
let ShareButton = videojs.extend(Button, {
    constructor: function (player, options) {
        Button.apply(this, arguments);
    },
    createEl: function() {
        let button = videojs.dom.createEl('button', {
            className: 'vjs-brand-container vjs-share-button fa fa-share',
        });
        let contentText = videojs.dom.createEl('span', {
            className: 'vjs-control-text'
        });
        videojs.dom.appendContent(contentText, 'share');
        button.appendChild(contentText);

        return button;
    },
    handleClick: function(event) {
        event.stopImmediatePropagation();

        this.overlay = new ShareContainer(this.player_, {});
        //console.log("share button: ", this.overlay);
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

videojs.registerComponent("ShareButton", ShareButton);
export default ShareButton;