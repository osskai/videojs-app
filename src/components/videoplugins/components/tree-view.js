import videojs from "video.js"
import TipTree from "@/components/videoplugins/utils/tiptree";

let Component = videojs.getComponent("Component");
let TreeView = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments)
    },
    createEl: function () {
        let container = videojs.dom.createEl('div', {
            className: 'vjs-treeview-container'
        });
        let tip = new TipTree();
        tip.addNode("Beverages", ["Water", "Coffee"]);
        container.appendChild(tip.tree);

        return container;
    },
    show: function () {
        this.el_.style.opacity = '1';
        let toggler = document.getElementsByClassName("caret");
        for (let i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", () => {
                this.el().querySelector(".nested").classList.toggle("active");
                toggler[i].classList.toggle("caret-down");
            });
        }
    },
    hide: function () {
        this.el_.style.opacity = '';
    }
});

videojs.registerComponent("TreeView", TreeView);
export default TreeView;