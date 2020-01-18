<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <video-holder></video-holder>
    </section>
</template>

<script>
    import VideoHolder from "@/views/VideoHolder";
    export default {
        name: "VideoPage",
        components: {
            VideoHolder
        },
    }
</script>

<style scoped>

</style>