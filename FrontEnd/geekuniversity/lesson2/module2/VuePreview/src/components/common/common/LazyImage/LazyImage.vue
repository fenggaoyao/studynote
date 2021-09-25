<template>
    <div class="xp-lazy-image" ref="lazy">
        <span :style="{paddingTop: !!realSrc ? 0 : lazyImageRatio}"></span>
        <img :style="cssText" :class=" realSrc ? 'lazy-img-active' : 'lazy-load-img' "
             :alt="alt"
             :src="realSrc"/>
    </div>
</template>

<script type="es6">
    import Vue from 'vue';

    const LISTEN_INTERVAL = 100;

    export default {
        name: 'xp-lazy-image',

        props: {
            lazyImageRatio: {
                type: String,
                require: false,
                default: '60%'
            },
            borderRadius: {
                type: Number,
                require: false,
                default: 0
            },
            alt: {
                type: String,
                require: false,
                default: '图片'
            },
            src: {
                type: String,
                require: true,
                default: ''
            },
        },

        mounted() {
            this.lazyLoad();
        },

        data() {
            return {
                loaded: false,
            }
        },

        computed: {
            realSrc() {
                return this.loaded ? this.src : ''
            },

            cssText(){
                return {
                    'border-radius': this.borderRadius + 'px',
                    'z-index': 1,
                    'display': 'block'
                };
            }
        },

        methods: {
            lazyLoad(options = {x: 100, y: 200}) {
                let timer = null;
                let xThreshold = 100;
                let yThreshold = 200;
                let remove = () => console.warn('remove function is not been settled');
                const $lazy = this.$refs.lazy;

                const listener = () => {
                    timer && clearTimeout(timer);
                    timer = setTimeout(function () {
                        const rect = $lazy.getBoundingClientRect();
                        if (rect.top < window.screen.height + yThreshold
                                && rect.left < window.screen.width + xThreshold) {
                            // this.realSrc = this.wrapImage(this.src);
                            // wrap image will block png, so set src directly
                            // this.realSrc = this.src;
                            this.loaded = true;
                            remove();
                        }
                    }.bind(this), LISTEN_INTERVAL);
                };

                remove = () => {
                    window.removeEventListener('scroll', listener, true);
                    window.removeEventListener('touchmove', listener, true);
                };

                const add = (options) => {
                    options.x && (xThreshold = options.x);
                    options.y && (yThreshold = options.y);
                    window.addEventListener('scroll', listener, true);
                    window.addEventListener('touchmove', listener, true);
                    listener();
                };

                return add(options);
            }
        },
    }
</script>

<style lang="less">
    .xp-lazy-image {
        position: relative;
        perspective: 1000px;
        -webkit-perspective: 1000px;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        width: 100%;

        img {
            -webkit-user-drag: none;
            -webkit-user-select: none;
            max-width: 100%;
            max-height: 100%;
            margin: auto;
        }

        .lazy-img-active,
        .no-lazy-img {
            width: 100%;
            height: 100%;
            position: relative;
            left: 0;
            top: 0;
            -webkit-background-size: contain;
            background-size: contain;
            border: none;
            transform-origin: bottom center;
        }

        .lazy-load-img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: #f7f7f7 url('/public/images/no-image-icon.png') no-repeat center center;
            -webkit-background-size: contain;
            background-size: contain;
            border: none;
            transform-origin: bottom center;
        }

        .load-effect {
            animation: img-fadeIn 0.6s 0s ease-out;
        }

        span {
            display: block;
            background: #f0f0f0;
        }
    }
    @keyframes img-fadeIn {
        0% {
            transform: rotateX(45deg);
            opacity: 0;
        }

        100% {
            transform: rotateX(0deg);
            opacity: 1;
        }
    }

</style>
