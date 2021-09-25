<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <input class="input-item input-slide-mini" type="Number" v-model="val" @change="inputChange" @blur="inputChange" @input="inputChange"></input>
    </div>
</template>

<script>

export default {
    name: 'xp-input-slide',
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
            type: Number,
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
            if(this.val != ''){
                this.valueChange && this.valueChange(this.name, parseInt(this.val), 'InputSlide');
            }
        },
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, 0, 'InputSlide');
        })
    }
}
</script>

<style lang="less-loader">
    .input-slide-mini{
        width: 100px;
    }
</style>