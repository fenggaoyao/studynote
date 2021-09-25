<template>
    <div class="compo-flex-item-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>
</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
    {
        name: 'padding',
        title: '边距',
        type: String,
        default: '0 0 0 0',
        require: false,
        component: 'InputLRTB'
    },
    {
        name: 'background',
        title: '背景颜色',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    }
];

export default {
    name: 'xp-flex-item-property',
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