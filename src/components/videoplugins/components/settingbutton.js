import videojs from 'video.js'
import SettingContainer from "@/components/videoplugins/components/settingcontainer";

let Component = videojs.getComponent("Component");
let Button = videojs.getComponent("Button");
let SettingButton = videojs.extend(Button, {
    constructor: function (player, options) {
        Button.apply(this, arguments);
        this.controlText('Setting');
    }
});
SettingButton.prototype.createEl = function () {
    let el = Button.prototype.createEl.call(this);
    //console.log("Button: ", el);
    el.setAttribute('title', 'setting');

    return el;
};
SettingButton.prototype.buildCSSClass = function () {
    return Button.prototype.buildCSSClass.call(this) + ' fa fa-cog'
};
SettingButton.prototype.handleClick = function(event) {
    let container = this.player_.getChild("SettingContainer");
    if (!(container instanceof Component)) {
        container = this.player_.addChild("SettingContainer");
    }
    container.show();

    this.player_.pause();
};

videojs.registerComponent("SettingButton", SettingButton);
export default SettingButton;