<template>
    <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered"></video>
</template>

<script>
    import videojs from 'video.js';
    import 'videojs-contrib-ads'
    import ShareButton from "@/components/videoplugins/components/share-button";
    import AdsMarker from "@/components/videoplugins/components/ad-markers";
    import StickyIcon from "@/components/videoplugins/components/sticky-icon";
    import SettingButton from "@/components/videoplugins/components/settingbutton";
    //import ResolutionSwitcher from "@/components/videoplugins/components/resolution-switcher"
    export default {
        name: "VideoPlayer",
        props: {
            options: {
                type: Object,
                default() {
                    return {};
                },
                require: true
            }
        },
        data() {
            return {
                player: null,
            }
        },
        mounted() {
            this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
                let player = this;
                player.ads();
                // prevent preroll ads, otherwise spinner will show
                player.trigger('nopreroll');
                player.one('adtimeout', function () {
                    console.log('ads ready fail.');
                });
                // plugin
                // player.resolutionSwitcher({
                //     sources: [
                //         {
                //             src: "http://localhost:8080/video/oceans.mp4",
                //             type: 'video/mp4',
                //             label: '360p',
                //             res: 0
                //         },
                //         {
                //             src: "http://localhost:8080/video/oceans.mp4",
                //             type: 'video/mp4',
                //             label: '720p',
                //             res: 1
                //         }
                //     ]
                //});
            });
            this.player.one('loadedmetadata', () => {
                this.createDotPosition();
                this.createShareButton();
            });
        },
        beforeDestroy() {
            if (this.player) {
                this.player.dispose()
            }
        },
        methods: {
            createDotPosition() {
                this.$nextTick(() => {
                    this.player.getChild("controlBar").getChild("progressControl").getChild("seekBar").addChild("AdsMarker", {
                        markers: [
                            {time: 3, text: "Hello World!", type: "QUIZ"},
                            {time: 10, text: "Yeah!", type: "ADS"},
                            {time: 20, text: "Magic!", type: null}
                        ],
                        playAd: (marker) => {
                            let type = marker.options_.notation.type;
                            let time = marker.options_.notation.time;
                            if ("QUIZ" === type) {
                                this.player.addChild("StickyIcon", {
                                    icon: 'cloud',
                                    left: 30,
                                    top: 30
                                });
                                // dispose
                                this.player.on("timeupdate", () => {
                                    if (this.player.currentTime() - time > 3.0) {
                                        this.player.removeChild("StickyIcon");
                                    }
                                });
                            } else if ("ADS" === type) {
                                this.player.ads.startLinearAdMode();
                                this.player.src('http://localhost:8080/video/kitteh.mp4');
                                // disable the controls
                                this.player.controls(false);

                                // prevent the loading spinner
                                this.player.one('adplaying', () => {
                                    this.player.trigger('ads-ad-started');
                                });

                                this.player.one('adended', () => {
                                    this.player.ads.endLinearAdMode();
                                    // restore the controls
                                    this.player.controls(true);
                                });
                            }
                        }
                    });
                })
            },
            createShareButton() {
                this.$nextTick(() => {
                    this.player.addChild("ShareButton");
                    let menuButton = new SettingButton(this.player, {});
                    this.player.controlBar.el().insertBefore(menuButton.el(), this.player.controlBar.getChild('fullscreenToggle').el());
                })
            },
        }
    }
 </script>
<style lang="scss">

</style>