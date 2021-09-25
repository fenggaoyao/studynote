<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <textarea class="input-item inputarea" :placeholder="title" v-model="val" @change="inputChange" @blur="inputChange" @input="inputChange"></textarea>
    </div>
</template>

<script>

export default {
    name: 'xp-input-area',
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
    data(){
        return {
            val: this.value
        }
    },
    methods: {
        inputChange(e){
            // if(this.val != ''){
                this.valueChange && this.valueChange(this.name, this.val, 'InputArea');
            // }
        },
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, 0, 'InputArea');
        })
    }
}
</script>

<style lang="less-loader">
    .compo-form .line-item .input-item.inputarea {
        height: 200px;
    }
</style>
