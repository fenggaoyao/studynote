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
        name: 'paramName',
        title: '参数名称',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'fontSize',
        title: '字体',
        type: Number,
        default: 14,
        require: true,
        component: 'InputNumber'
    },
    {
        name: 'color',
        title: '颜色',
        type: String,
        default: '#444444',
        require: true,
        component: 'InputColor'
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
