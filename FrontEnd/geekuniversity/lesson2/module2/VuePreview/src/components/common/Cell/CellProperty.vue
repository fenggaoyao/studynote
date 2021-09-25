<template>
    <div class="compo-cell-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>

</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
    {
        name: 'cid',
        title: 'cid',
        type: String,
        default: false,
        require: false,
        component: 'none'
    },
    {
        name: 'flex',
        title: 'flex',
        type: Number,
        default: 1,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'height',
        title: '高度',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'split'
    },
    {
        name: 'textAlign',
        title: '对齐',
        type: String,
        default: '',
        require: false,
        component: 'InputAlign'
    },
    {
        name: 'padding',
        title: '内边距',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        component: 'split'
    },
    {
        name: 'border',
        title: '边框',
        type: String,
        default: '0px #cccccc solid',
        require: false,
        component: 'InputBorder'
    },
    {
        name: 'borderRadius',
        title: '圆角',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'split'
    },
    {
        name: 'background',
        title: '背景',
        type: String,
        default: 'none',
        require: false,
        component: 'InputBackground'
    }
];


export default {
    name: 'xp-cell-property',
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

<style type="less-loader">
</style>
