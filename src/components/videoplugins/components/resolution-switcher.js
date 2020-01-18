import videojs from 'video.js'

// menu item
let MenuItem = videojs.getComponent("MenuItem");
let ResolutionMenuItem = videojs.extend(MenuItem, {
    constructor: function(player, options){
        options.selectable = true;
        MenuItem.apply(this, arguments);
        this.src = options.src;

        player.on('resolutionchange', videojs.bind(this, this.update));
    }
} );
ResolutionMenuItem.prototype.handleClick = function(event){
    MenuItem.prototype.handleClick.call(this,event);
    this.player_.currentResolution(this.options_.label);
};
ResolutionMenuItem.prototype.update = function(){
    if (this.player_ !== null) {
        let selection = this.player_.currentResolution();
        this.selected(this.options_.label === selection.label);
    }
};

videojs.registerComponent('ResolutionMenuItem', ResolutionMenuItem);

// menu button
let MenuButton = videojs.getComponent("MenuButton");
let ResolutionMenuButton = videojs.extend(MenuButton, {
    constructor: function(player, options){
        options.label = 'Quality';
        MenuButton.apply(this, arguments);
        this.controlText('Quality');
        this.el().setAttribute('aria-label','Quality');
        // set button content
        videojs.dom.insertContent(this.el().children[0], '360p');

        player.on('resolutionchange', videojs.bind( this, this.update ) );
    }
});
ResolutionMenuButton.prototype.createItems = function(){
    let menuItems = [];
    let labels = this.options_.sources;

    for (let key in labels) {
        if (labels.hasOwnProperty(key)) {
            menuItems.push(new ResolutionMenuItem(
                this.player_,
                {
                    label: labels[key].label,
                    src: labels[key].src,
                    selected: key === (this.currentSelection ? this.currentSelection.label : false)
                })
            );
        }
    }
    return menuItems;
};
ResolutionMenuButton.prototype.update = function(){
    this.sources = this.player_.getGroupedSrc();
    this.currentSelection = this.player_.currentResolution();
    videojs.dom.insertContent(this.el().children[0], this.currentSelection.label);
    return MenuButton.prototype.update.call(this);
};
ResolutionMenuButton.prototype.buildCSSClass = function(){
    return 'vjs-resolution-button';
};

videojs.registerComponent('ResolutionMenuButton', ResolutionMenuButton);

// plugin
const Plugin = videojs.getPlugin("plugin");
class ResolutionSwitcher extends Plugin {
    constructor(player, options) {
        super(player, options);
        options = videojs.mergeOptions({}, options);
        this.groupedSrc = {};
        this.currentSources = {};
        this.currentResolutionState = {};
        // add property for player
        this.player.getGroupedSrc = () => {
            return this.getGroupedSrc();
        };
        this.player.currentResolution = (label, customSourcePicker) => {
            return this.currentResolution(label, customSourcePicker);
        };

        player.ready(() => {
            let menuButton = new ResolutionMenuButton(player, options);
            let switcher = player.controlBar.el().insertBefore(menuButton.el(), player.controlBar.getChild('fullscreenToggle').el());
            switcher.dispose = () => {
                this.el().removeChild(menuButton.el());
            };
            if (options.sources.length > 1) {
                this.updateSrc(options.sources);
            }
        })
    }
    updateSrc(sources) {
        if (!sources) {
            return this.player.src();
        }

        sources = sources.filter((source) => {
            try {
                return (this.player.canPlayType(source.type) !== '');
            } catch (e) {
                return true;
            }
        });
        // sort sources
        this.currentSources = sources.sort(function (lhs, rhs) {
            return (+rhs.res) - (+lhs.res);
        });
        this.groupedSrc = this.bucketSources(this.currentSources);
        // pick one by default
        let chosen = this.chooseSrc(this.groupedSrc, this.currentSources);
        this.currentResolutionState = {
            label: chosen.label,
            source: chosen.source
        };

        this.player.trigger('updatesources');
        this.setSourcesSanitized(chosen.source, chosen.label);
        this.player.trigger('resolutionchange');
    }
    currentResolution(label, customSourcePicker) {
        if (label == null) {
            return this.currentResolutionState;
        }
        // lookup
        if (!this.groupedSrc || !this.groupedSrc.label || !this.groupedSrc.label[label]) {
            return;
        }

        let source = this.groupedSrc.label[label];
        let currentTime = this.player.currentTime();
        let isPaused = this.player.paused();

        if (!isPaused && this.player.options_.bigPlayButton) {
            this.player.bigPlayButton.hide();
        }

        this.setSourcesSanitized(source, label, customSourcePicker).one(
            'timeupdate', () => {
                this.player.currentTime(currentTime);
                this.player.handleTechSeeked_();
                if (!isPaused) {
                    let tmp = this.player.play();
                    console.log('picker: ', tmp);
                }
                this.player.trigger('resolutionchange');
            }
        );

        return this.player;
    }
    getGroupedSrc() {
        return this.groupedSrc;
    }
    setSourcesSanitized(source, label, customSourcePicker) {
        this.currentResolutionState = {
            label: label,
            source: source
        };
        if (typeof customSourcePicker === 'function') {
            return customSourcePicker(this.player, source, label);
        }
        this.player.src(source.map((src) => {
            return {
                src: src.src,
                type: src.type,
                res: src.res
            }
        }));

        return this.player;
    }
    bucketSources(sources) {
        let resolutions = {
            label: {},
            res: {},
            type: {}
        };
        sources.map((source) => {
            this.initResolutionKey(resolutions, 'label', source);
            this.initResolutionKey(resolutions, 'res', source);
            this.initResolutionKey(resolutions, 'type', source);

            this.appendSourceToKey(resolutions, 'label', source);
            this.appendSourceToKey(resolutions, 'res', source);
            this.appendSourceToKey(resolutions, 'type', source);
        });

        return resolutions;
    }
    initResolutionKey(resolutions, key, source) {
        if (resolutions[key][source[key]] == null) {
            resolutions[key][source[key]] = [];
        }
    }
    appendSourceToKey(resolutions, key, source) {
        resolutions[key][source[key]].push(source);
    }
    chooseSrc(groupedSrc, sources) {
        return {
            res: sources[0].res,
            label: sources[0].label,
            source: groupedSrc.res[sources[0].res]
        };
    }
}

ResolutionSwitcher.VERSION = "0.1.0";

videojs.registerPlugin("resolutionSwitcher", ResolutionSwitcher);
export default ResolutionSwitcher;

