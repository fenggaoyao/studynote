<template>
    <div class="compo-iscroll-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>
</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
    {
        name: 'columns',
        title: '列数',
        type: Number,
        default: 2,
        require: true,
        component: 'InputNumber'
    },
    {
        name: 'itemWidth',
        title: '卡片宽度',
        default: 200,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'height',
        title: '高度',
        default: 200,
        require: false,
        component: 'InputNumber'
    },
];

export default {
    name: 'xp-iscroll-property',
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
        },
    }
}
</script>