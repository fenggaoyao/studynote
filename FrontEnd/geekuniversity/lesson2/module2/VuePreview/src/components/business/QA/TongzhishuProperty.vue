<template>
    <div class="compo-urlParam-property">
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
        name: 'background',
        title: '背景图片',
        type: String,
        default: '',
        require: true,
        component: 'InputUpload'
    },
    {
        name: 'paramName',
        title: '参数名称',
        type: String,
        default: 'uname',
        require: true,
        component: 'InputText'
    }
];

export default {
    name: 'xp-urlParam-property',
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
