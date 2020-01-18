<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-10">
                <video-player :options="videoOptions"/>
            </div>
            <div class="col-lg-1"></div>
        </div>
    </div>
</template>

<script>
    import VideoPlayer from "@/components/VideoPlayer.vue";

    export default {
        name: "VideoHolder",
        components: {
            VideoPlayer
        },
        data() {
            return {
                videoOptions: {
                    autoplay: false,
                    controls: true,
                    muted: true,
                    fluid: false, // if playing different video, disable the fluid
                    width: 820,
                    height: 360,
                    sources: [
                        {
                            src: "http://localhost:8080/video/oceans.mp4",
                            type: "video/mp4"
                        }
                    ]
                }
            };
        },
    }
</script>

<style scoped>

</style>