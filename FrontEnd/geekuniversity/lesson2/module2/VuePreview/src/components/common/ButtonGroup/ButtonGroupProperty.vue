<template>
    <div class="compo-button-group-property">
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
    }
];

export default {
    name: 'xp-button-group-property',
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