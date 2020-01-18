import videojs from "video.js"
import StickyContainer from "@/components/videoplugins/components/sticky-container";
import TreeView from "@/components/videoplugins/components/tree-view";

let Component = videojs.getComponent("Component");
let StickyIcon = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    createEl: function () {
        let container = videojs.dom.createEl('div', {
            className: 'vjs-sticky-parent'
        });
        container.style.left = this.options_.left + 'px';
        container.style.top = this.options_.top + 'px';

        let btn = videojs.dom.createEl('button', {
            className: this.buildCSSClass()
        });

        this.tree = new TreeView(this.player_, {});
        // enter and leave
        btn.onmouseenter = () => {
            this.button_timer = this.setTimeout(() => {
                this.player_.pause();
                // show tips
                this.tree.show();
            }, 1000);
        };
        btn.onmouseleave = () => {
            if (undefined !== this.button_timer) {
                this.clearTimeout(this.button_timer);
            }
        };
        btn.onclick = () => {
            if (container.contains(this.tree.el())) {
                container.removeChild(this.tree.el());
            }

            this.container = new StickyContainer(this.player_, {});
            // console.log("click: ", this.container.exitButton);
            this.container.exitButton.on('click', videojs.bind(this, this.onCancelEvent));

            container.appendChild(this.container.el());
            this.container.show();

            this.player_.pause();
        };

        container.appendChild(btn);
        container.appendChild(this.tree.el());

        return container;
    },
    buildCSSClass: function () {
        return 'vjs-sticky-button fa fa-' + this.options_.icon + ' fa-5x';
    },
    onCancelEvent: function () {
        this.el().removeChild(this.container.el());
        this.container.dispose();
        delete this.container;
    }
});

videojs.registerComponent("StickyIcon", StickyIcon);
export default StickyIcon;