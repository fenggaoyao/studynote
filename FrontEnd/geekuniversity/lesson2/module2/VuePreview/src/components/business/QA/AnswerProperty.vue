<template>
    <div class="compo-answer-property">
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
        name: 'no',
        title: '编号',
        type: String,
        default: 'A',
        require: false,
        component: 'InputText'
    },
    {
        name: 'titleText',
        title: '文字',
        type: String,
        default: '',
        require: false,
        component: 'InputArea'
    },
    {
        name: 'titleImage',
        title: '图片',
        type: String,
        default: '',
        require: false,
        component: 'InputUpload'
    },
    {
        name: 'titleAudio',
        title: '音频',
        type: String,
        default: '',
        require: false,
        component: 'InputAudioUpload'
    },
    {
        name: 'score',
        title: '分数',
        type: Number,
        default: 5,
        require: false,
        component: 'InputNumber'
    }
];

export default {
    name: 'xp-answer-property',
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
