import videojs from "video.js";
import DotMarker from "@/components/videoplugins/components/dot-marker";

let Component = videojs.getComponent("Component");
let AdsMarker = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    createEl: function() {
        this.markers = [];
        this.markersMap = {};
        let div = videojs.dom.createEl('div', {
            className: 'vjs-dot-container'
        });
        let notations = this.options_.markers;
        notations.forEach((notation) => {
            let marker = new DotMarker(this.player_, {
                notation: notation,
                size: 200,
                fontSize: 14
            });
            this.addMarkers(marker);
            div.appendChild(marker.el());
        });
        this.nextMarker = this.getNextMarker(0);
        this.player_.on('timeupdate', videojs.bind(this, this.onTimeUpdate));
        this.player_.on('seeking', videojs.bind(this, this.onUpdateMarker));

        return div;
    },
    sortMarkers: function () {
        this.markers.sort(function (lhs, rhs) {
            return lhs.time - rhs.time;
        })
    },
    addMarkers: function (dot_marker) {
        this.markersMap[dot_marker.key] = dot_marker;
        this.markers.push(dot_marker);

        this.sortMarkers();
    },
    getNextMarker: function (time) {
        for (let marker of this.markers) {
            if (marker.time >= time) {
                return marker;
            }
        }
        return undefined;
    },
    removeMarker: function (dot_marker) {
        delete this.markersMap[dot_marker.key];
        for (let i = this.markers.length - 1; i >= 0; i--) {
            if (this.markers[i].key === dot_marker.key) {
                this.markers.splice(i, 1);
            }
        }

        this.sortMarkers();
    },
    onTimeUpdate: function () {
        if (undefined !== this.nextMarker) {
            let currentTime = this.player_.currentTime();
            if (0 !== currentTime) {
                if (this.nextMarker.time <= currentTime) {
                    this.options_.playAd(this.nextMarker);
                    this.nextMarker = this.getNextMarker(currentTime);
                }
            }
        }
    },
    onUpdateMarker: function () {
        let currentTime = this.player_.currentTime();
        this.nextMarker = this.getNextMarker(currentTime);
    }
});

videojs.registerComponent("AdsMarker", AdsMarker);
export default AdsMarker;