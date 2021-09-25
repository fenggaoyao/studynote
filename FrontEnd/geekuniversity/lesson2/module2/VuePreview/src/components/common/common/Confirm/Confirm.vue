<template>
    <div id="xp-confirm" class="xp-confirm-mask" :class="{'show': isShow}">
        <div class="xp-confirm-wrapper">
            <div class="xp-confirm-container" :class="{'show': isShow}">
                <div class="title" v-if="!!title">{{title}}</div>
                <div class="content">{{content}}</div>
                <div class="button-container">
                    <div class="cancel" @click="handleCancel">取消</div>
                    <div class="ok" @click="handleOK">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    export default {
        name: 'xp-confirm',

        data() {
            return {
                isShow: false,
                title: '',
                content: '',
                onOK: () => {},
                onCancel: () => {}
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
            },

            handleCancel() {
                this.hide();
                typeof this.onCancel === 'function' && (this.onOK());
            }
        }
    }
</script>

<style lang="less-loader">
    .xp-confirm-mask.show {
        opacity: 1;
    }
    .xp-confirm-mask {
        position: fixed;
        z-index: 10000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: rgba(0, 0, 0, .3);
        transition: opacity .2s ease;
        overflow: hidden;
        color: rgb(100, 100, 100);
    }
    .xp-confirm-mask > .xp-confirm-wrapper {
        display:table;
        margin: 0 auto;
        height: 100%;
        width: 60%;
        overflow: hidden;
    }
    .xp-confirm-mask > .xp-confirm-wrapper > .xp-confirm-container {
        position: absolute;
        top: 35%;
        display: block;
        padding-top: .2rem;
        width: 60%;
        background-color: rgb(245, 245, 245);
        border: 1px solid rgb(235, 235, 235);
        border-radius: .1rem;
        transition: all .2s ease;
        &.show {
             margin-top: .1rem;
         }

        .button-container {
            display: flex;
        }

        .title {
            @extend %padding;
            @extend %border;
            padding-bottom: .1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
        }

        .content {
            @extend %padding;
            @extend %border;
            height: .8rem;
            line-height: .4rem;
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

        .ok,
        .cancel {
            @extend %padding;
            width: 50%;
            height: .5rem;
            line-height: .5rem;
            text-align: center;
        }

        .cancel {
            border-right: 1px solid rgb(235, 235, 235);;
        }
    }
</style>
