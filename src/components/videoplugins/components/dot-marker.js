import videojs from 'video.js'
import PreviewWindow from "@/components/videoplugins/components/preview-window";

let Component = videojs.getComponent("Component");
let DotMarker = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
        this.key = this.uuid();
    },
    uuid() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
        return uuid;
    },
    createEl: function () {
        let notation = this.options_.notation;
        this.time = notation.time;

        let duration = this.player_.duration();

        //console.log("dot marker: ", this.time, duration);
        let dot_position = this.time / duration * 100;
        let span_obj = videojs.dom.createEl('span', {
            className: "vjs-notation",
        },{
            'data-key': this.key,
            'data-time': this.time,
        });
        span_obj.style.left = `${dot_position}%`;

        let previewWindow = new PreviewWindow(this.player_, {
            size: this.options_.size,
            fontSize: this.options_.fontSize
        });
        span_obj.appendChild(previewWindow.el());

        span_obj.onmouseover = () => {
            previewWindow.previewText(notation.text);
            previewWindow.previewTime(notation.time);
            previewWindow.show(notation.time)
        };
        span_obj.onmouseout = () => {
            previewWindow.hide()
        };

        return span_obj;
    }
});

videojs.registerComponent("DotMarker", DotMarker);

export default DotMarker;