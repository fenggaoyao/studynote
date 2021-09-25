<template>
    <span class="compo-qrcode" >
        <img ref="qr_container" :width="size" :height="size"/>
    </span>
</template>

<script>
import Utils from 'utils'
const QRious = require('qrious');

export default {
    name: 'xp-qrcode',
    autoEdit: true,
    props: {
        value: {
            title: '地址',
            type: String,
            default: 'http://h5.inwaimai.baidu.com',
            require: true,
            component: 'InputText',
            configurable: true
        },
        size: {
            title: '宽度',
            type: Number,
            default: 128,
            require: true,
            component: 'InputNumber'
        },
        padding: {
            title: '边距',
            type: Number,
            default: 10,
            require: false,
            component: 'InputNumber'
        }
    },
    mounted(){
        this.update();
    },
    watch: {
        'value': function(val, oldVal){
            this.update();
        },
        'size': function(val, oldVal){
            this.update();
        }
    },
    methods: {
        update() {
            const qr = new QRious({ value: this.value , size: this.size, padding: this.padding});
            this.$refs.qr_container.src = qr.toDataURL();
        }
    }
}
</script>

<style>
</style>