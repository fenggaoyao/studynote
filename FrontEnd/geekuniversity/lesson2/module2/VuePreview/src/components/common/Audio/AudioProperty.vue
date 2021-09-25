<template>
    <div class="">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>

</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

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
    name: 'xp-audio-property',
    components: {
        'xp-form': Form
    },
    props: Utils.toProps(config),
    data() {
        return {
            fields: Utils.toData(config, this)
        }
    },
    methods: {
        valueChange(data){
            this.dispatchPropertyChange(data);
        }
    }
}
</script>

<style>
</style>
