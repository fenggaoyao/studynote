<template>
    <div class="compo-paper-property">
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
        name: 'headerImage',
        title: '头部背景图',
        type: String,
        default: 'https://img.waimai.baidu.com/pb/2499a2700ea31b593bf67e580c1b624443@w_750,q_80',
        require: false,
        component: 'InputUpload'
    },
    {
        name: 'submitImage',
        title: '提交按钮图',
        type: String,
        default: 'https://img.waimai.baidu.com/pb/8973102ad6633373fa3cefcb59e0998400@w_750,q_80',
        require: false,
        component: 'InputUpload'
    }
];

export default {
    name: 'xp-paper-property',
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
