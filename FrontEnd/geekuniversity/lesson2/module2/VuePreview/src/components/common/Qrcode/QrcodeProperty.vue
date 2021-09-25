<template>
    <div class="compo-qrcode-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>
</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
    {
        name: 'value',
        title: '地址',
        type: String,
        default: 'http://h5.inwaimai.baidu.com',
        require: true,
        component: 'InputText'
    },
    {
        name: 'size',
        title: '宽度',
        type: Number,
        default: 128,
        require: true,
        component: 'InputNumber'
    }
];

export default {
    name: 'xp-qrcode-property',
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