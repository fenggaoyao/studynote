<template>
    <div class="compo-tab-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>
</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
        {
        name: 'forbiden',
        title: '敏感词',
        type: String,
        default: '习近平,李克强',
        require: true,
        component: 'InputText'
    },
    {
        name: 'answers',
        title: '答案',
        type: String,
        default: '',
        require: true,
        component: 'InputArea'
    },
    {
        name: 'shareResults',
        title: '分享结果',
        type: String,
        default: '',
        require: true,
        component: 'InputArea'
    },
];

export default {
    name: 'xp-tab-property',
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