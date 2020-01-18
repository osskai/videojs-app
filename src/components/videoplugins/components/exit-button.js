import videojs from "video.js"

let Button = videojs.getComponent("Button");
let ExitButton = videojs.extend(Button, {
    constructor: function (player, options) {
        Button.apply(this, arguments)
    },
    createEl: function () {
        return videojs.dom.createEl('button', {
            className: this.buildCSSClass()
        });
    },
    buildCSSClass: function() {
        return 'fa fa-close ' + this.options_.className;
    },
    handleClick: function (event) {
        console.log("cancel");
        this.player_.play();
    }
});

videojs.registerComponent("ExitButton", ExitButton);

export default ExitButton;