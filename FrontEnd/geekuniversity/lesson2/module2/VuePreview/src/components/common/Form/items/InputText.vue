<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <input class="input-item" type="Text" :placeholder="title" v-model="val" @change="inputChange" @blur="inputChange" @input="inputChange"></input>
    </div>
</template>

<script>

export default {
    name: 'xp-input-text',
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
            if(this.val != this.value){
                this.valueChange && this.valueChange(this.name, this.val, 'InputText');
            }
        },
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, 0, 'InputText');
        })
    }
}
</script>
