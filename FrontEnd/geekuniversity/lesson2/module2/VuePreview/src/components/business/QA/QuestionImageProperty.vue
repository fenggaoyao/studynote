<template>
    <div class="compo-question-property">
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
        default: '一',
        require: false,
        component: 'InputText'
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
        name: 'answers',
        title: '答案',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    }
];

export default {
    name: 'xp-question-property',
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
