import videojs from "video.js"

let Component = videojs.getComponent("Component");
let Dammu = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    createEl: function () {
        let barrage = videojs.dom.createEl('span', {
            className: 'vjs-dammu-barrage',
        });
        barrage.dom.appendChild(barrage, this.options_.text);
        barrage.style.top = this.options_.pos + 'px';
        barrage.style.width = this.options_.text.length*16 + 'px';
        barrage.style.color = this.options_.color;

        return barrage;
    }
});

videojs.registerComponent("Dammu", Dammu);
export default Dammu;