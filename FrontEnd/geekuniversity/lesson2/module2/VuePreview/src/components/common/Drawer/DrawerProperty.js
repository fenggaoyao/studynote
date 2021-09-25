import Vue from 'vue'
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
        name: 'active',
        title: '外边距',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
];

export default {
    name: 'xp-drawer-property',
    components: {
        'xp-form': Form
    },
    props: Utils.toProps(config),
    data() {
        return {
            fields: Utils.toData(config, this)
        }
    },

    render(h) {
        return (
            <xp-form fields={this.fields} change={this.valueChange}></xp-form>
        )
    },
    
    methods: {
        valueChange(data){
            this.dispatchPropertyChange(data);
        },
    }
}

