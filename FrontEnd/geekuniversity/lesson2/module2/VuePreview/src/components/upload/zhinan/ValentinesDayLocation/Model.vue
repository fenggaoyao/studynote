<template>
    <div v-show="show" class="vue-modal-mask" @click="clickModalHide">
        <div class="vue-modal-close" v-if="showClose">x</div>

        <div class="vue-modal-wrapper">
            <slot class="vue-modal-container" name="content"></slot>
        </div>
    </div>
</template>

<script type="es6">
    export default {
        name: 'modal',

        props: {
            showClose: {
                type: Boolean,
                default: true
            },

            clickToHide: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                show: true
            };
        },

        methods: {
            showModal() {
                this.show = true;
                document.body.style.overflow = 'hidden';
            },

            hideModal() {
                this.show = false;
                document.body.style.overflow = '';
            },

            clickModalHide() {
                this.clickToHide && this.hideModal();
            }
        }
    }
</script>

<style lang="less-loader">
    .vue-modal-mask {
        position: fixed;
        z-index: 10000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, .7);
        transition: opacity .3s ease;
        overflow: hidden;
    }
    .vue-modal-mask > .vue-modal-wrapper {
        display:table;
        margin: 0 auto;
        height: 100%;
        width: 80%;
        transition: margin-top .4s ease;
        overflow: hidden;
    }
    .vue-modal-mask > .vue-modal-wrapper > .vue-modal-container {
        position: relative;
        display: table-cell;
        vertical-align: middle;
    }
    .vue-modal-mask > .vue-modal-close {
        position: fixed;
        right: 30px;
        top: 10px;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        font-family: verdana;
        cursor: pointer;
        z-index: 10001;
    }
</style>