<template>
    <div class="audio-container">
        <div class="audio-cover" v-if="!!picUrl" @click.stop="operate">
            <xp-image v-if="!playing" :src="picUrl"/>
            <xp-image v-else :class="{animate: animate}" :src="activePicUrl"/>
        </div>
        <audio ref="audio" style="display:none;" preload="auto"
               :id="playerId"
               :src="audioUrl"
               :loop="loop"></audio>
    </div>
</template>

<script>
    import Utils from 'utils'
    import Image from 'components/common/Image/Image'
    import {initWXResource} from 'platform'
    // 如果没有设置覆盖图片，默认隐藏
    //
    const config = [
        {
            name: 'audioUrl',
            title: '音频地址',
            type: String,
            require: true,
            component: 'InputAudioUpload'
        },
        {
            name: 'picUrl',
            title: '待播放图片',
            type: String,
            require: false,
            component: 'InputUpload'
        },
        {
            name: 'activePicUrl',
            title: '播放中图片',
            type: String,
            require: false,
            component: 'InputUpload'
        },
        {
            name: 'autoplay',
            title: '自动播放',
            type: Boolean,
            default: false,
            require: false,
            component: 'InputSwitch'
        },
        {
            name: 'playOnce',
            title: '只播放一次(只针对自动播放)',
            type: Boolean,
            default: false,
            require: false,
            component: 'InputSwitch'
        },
        {
            name: 'loop',
            title: '循环播放',
            type: Boolean,
            default: false,
            require: false,
            component: 'InputSwitch'
        },
        {
            name: 'animate',
            title: '播放动画',
            type: Boolean,
            default: false,
            require: false,
            component: 'InputSwitch'
        }
    ]

    export default {
        name: 'xp-audio',
        props: Utils.toProps(config),
        components: {
            'xp-image': Image
        },
        data() {
            return {
                loaded: false,
                playing: false,
                paused: false,
                uuid: this.generateUUID(),
                audio: undefined,
                mid: Utils.getQueryString('modelId')
//                currentTime: '00:00'
            }
        },

        computed: {
            playerId() {
                return 'player-' + this.uuid
            }
        },

        beforeMount() {
            this.activePicUrl && Utils.requireImg(this.activePicUrl)
        },

        mounted() {
            this.audio = this.$refs.audio
            this.init()
        },

        beforeDestroy() {
            this.removeEventListener()
        },

        methods: {
            generateUUID() {
                return 'xxxxxxxx-xxxx-4xxx'.replace(/[xy]/g, function (c) {
                    const r = Math.random() * 16 | 0
                    const v = c === 'x' ? r : (r & 0x3 | 0x8)
                    return v.toString(16)
                })
            },

            init() {
                this.audio.pause()
                this.audio.currentTime = 0
                this.audio.addEventListener('loadeddata', this.handleLoaded)
                this.audio.addEventListener('pause', this.handlePlayPause)
//                this.audio.addEventListener('timeupdate', this.handlePlayingUI)
//                this.audio.addEventListener('play', this._handlePlayPause)

                this.preLoadAction()
                this.autoPlayAction()

                eventHub.$on('beforeChangePage', param => {
                    this.audio.currentTime = 0
                    this.audio.pause()
                })
            },

            preLoadAction() {
                if (!this.autoplay) {
                    if (this.isWeixin()) {
                        initWXResource().then(wx => {
                            wx.ready(this.preLoad)
                        })
                    } else {
//                        this.preLoad()
                    }
                }
            },

            preLoad() {
                if (!this.playing) {
                    this.audio.play()
                    this.audio.pause()

                }
            },

            autoPlayAction() {
                if (this.autoplay && !localStorage.getItem(`${this.mid}-audioplayed`)) {
                    if (this.isWeixin()) {
                        initWXResource().then(wx => {
                            wx.ready(function() {
                                this.audio.play()
                            }.bind(this))
                        })
                    } else {
                        this.audio.play()
                    }
                }
            },

            removeEventListener() {
                this.audio.removeEventListener('loadeddata', this.handleLoaded)
                this.audio.removeEventListener('pause', this.handlePlayPause)
//                this.audio.removeEventListener('timeupdate', this.handlePlayingUI)
//                this.audio.removeEventListener('play', this._handlePlayPause)
            },

            handleLoaded() {
                if (this.audio.readyState >= 2) {
                    this.loaded = true
                    this.autoplay && !localStorage.getItem(`${this.mid}-audioplayed`) && this.audio.play()
                } else {
                    throw new Error('Failed to load sound file')
                }
            },

            handlePlayPause(e) {
                if (e.type === 'pause') {
                    this.playing = false
                    this.pause = true
                    this.playOnce && localStorage.setItem(`${this.mid}-audioplayed`, true)
                }
            },

//            handlePlayingUI() {
//                const currentTime = parseInt(this.audio.currentTime)
//                const percentage = parseInt((currTime / this.totalDuration) * 100)
//                this.currentTime = formatTime(currentTime)
//            },

            operate() {
                this.playing ? this.stop() : this.play()
            },

            play() {
                if (this.playing) {
                    return
                }
                this.paused = false
                this.audio.play()
                this.playing = true
                this.newSak({
                    daSrc: 'audio.play',
                    daAct: 'click',
                    daTrace: ''
                })
            },

            stop() {
                if (!this.playing) {
                    return
                }
                this.audio.currentTime = 0
                this.audio.pause()
                this.playing = false
                this.paused = false
                this.newSak({
                    daSrc: 'audio.stop',
                    daAct: 'click',
                    daTrace: ''
                })
            },

            pause() {
                if (this.paused) {
                    return
                }
                this.playing = false
                this.audio.pause()
                this.paused = true
                this.newSak({
                    daSrc: 'audio.pause',
                    daAct: 'click',
                    daTrace: ''
                })
            },
        }
    }
</script>

<style lang="less">
    .audio-container {
        .animate {
            animation: pulse 1s linear infinite;
        }
        @keyframes pulse {
            from {
                transform: scale3d(1, 1, 1);
            }

            50% {
                transform: scale3d(1.05, 1.05, 1.05);
            }

            to {
                transform: scale3d(1, 1, 1);
            }
        }
    }
</style>
