<template>
    <div id="xp-alert" class="xp-alert-mask" :class="{'show': isShow}">
        <div class="xp-alert-wrapper">
            <div class="xp-alert-container" :class="{'show': isShow}">
                <div class="title" v-if="!!title">{{title}}</div>
                <div class="content">{{content}}</div>
                <div class="ok" @click="handleOK">确认</div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    import Vue from 'vue';

    export default {
        name: 'xp-alert',

        data() {
            return {
                isShow: false,
                title: '',
                content: '',
                onOK: () => {}
            };
        },

        mounted() {
            setTimeout(this.show, 20);
        },

        methods: {
            show() {
                this.isShow = true;
                document.body.style.overflow = 'hidden';
            },

            hide() {
                document.body.style.overflow = '';
                this.isShow = false;
                // because transition-duration is .2s
                setTimeout(this.destroy, 200);
            },

            handleOK() {
                this.hide();
                typeof this.onOK === 'function' && (this.onOK());
            }
        }
    }
</script>

<style lang="less-loader">
    .xp-alert-mask.show {
        opacity: 1;
    }
    .xp-alert-mask {
        position: fixed;
        z-index: 10000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: rgba(0, 0, 0, .3);
        transition: all .2s ease;
        overflow: hidden;
        color: rgb(100, 100, 100);
    }
    .xp-alert-mask > .xp-alert-wrapper {
        display: table;
        margin: 0 auto;
        height: 100%;
        width: 60%;
        overflow: hidden;
    }
    .xp-alert-mask > .xp-alert-wrapper > .xp-alert-container {
        position: absolute;
        top: 35%;
        display: block;
        padding-top: .2rem;
        width: 60%;
        background-color: rgb(245, 245, 245);
        border: 1px solid rgb(235, 235, 235);
        border-radius: .1rem;
        transition: all .2s ease;
        font-size: 0.3rem;

        &.show {
             margin-top: .1rem;
        }

        .title {
            padding: 0 0.1rem 0.1rem 0.2rem;
            border-bottom: 1px #f0f0f0 solid;
            padding-bottom: .1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
        }

        .content {
            padding: 0.2rem;
            border-bottom: 1px #ddd solid;
            min-height: .8rem;
            display: -moz-flex; /*Firefox*/
            display: -webkit-flex; /*Safari,Opera,Chrome*/
            display: flex;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            flex-direction: column;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
        }

        .ok {
            padding: 0.15rem;
            text-align: center;
        }
    }
</style>
