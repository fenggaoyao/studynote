<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <input class="input-item input-color" type="Color" :placeholder="title" v-model="val" @change="inputChange" @blur="inputChange" @input="inputChange"></input>
    </div>
</template>

<script>
export default {
    name: 'xp-input-color',
    props: {
        title: {
            type: String,
            default: '',
            required: false
        },
        name: {
            type: String,
            required: true
        },
        default: {
            type: String,
            default: 'text',
            required: false
        },
        component: {
            type: String,
            default: 'text',
            required: false
        },
        value: {
            type: String,
            required: false
        },
        valueChange: {
            type: Function,
            require: false
        },
        validate: {
            type: String,
            default: () => '',
            required: false
        }
    },
    components: {
    },
    data(){
        return {
            val: this.value
        }
    },
    methods: {
        inputChange(e){
            this.valueChange && this.valueChange(this.name, this.val, 'InputColor');
        }
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, 0, 'InputColor');
        })
    }
}
</script>

<style lang="less-loader">
    .input-color{
        width: 50px;
    }
</style>
