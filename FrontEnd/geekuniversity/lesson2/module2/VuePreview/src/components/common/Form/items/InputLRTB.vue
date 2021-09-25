<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <span class="pad-box">
            <input class="input-item input-top" type="number" placeholder="上" v-model="top" @change="inputChange" @blur="inputChange" @input="inputChange"></input>
            <input class="input-item input-bottom" type="number" placeholder="下" v-model="bottom" @change="inputChange" @blur="inputChange" @input="inputChange"></input>
            <input class="input-item input-left" type="number" placeholder="左" v-model="left" @change="inputChange" @blur="inputChange" @input="inputChange"></input>
            <input class="input-item input-right" type="number" placeholder="右" v-model="right" @change="inputChange" @blur="inputChange" @input="inputChange"></input>
        </span>
    </div>
</template>

<script>

export default {
    name: 'xp-input-l-r-t-b',
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
        if(this.value){

        }
        let lrtb = this.value.replace(/[px|rem|%]/g, '').split(' ');
        return {
            left: lrtb[3],
            right: lrtb[1],
            top: lrtb[0],
            bottom: lrtb[2]
        }
    },
    methods: {
        inputChange(e){
            let l = this.left|| 'initial';
            let r = this.right|| 'initial';
            let t = this.top|| 'initial';
            let b= this.bottom|| 'initial';

            let lrtb = [t + 'px', r + 'px', b + 'px', l + 'px'].join(' ');
            this.valueChange && this.valueChange(this.name, lrtb, 'InputLRTB');
        }
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, '0 0 0 0', 'InputLRTB');
        })
    }
}
</script>

<style lang="less-loader">
    .pad-box{
        display: inline-block;
        width: 174px;
        height: 100px;
        position: relative;
        vertical-align: middle;
        
        .input-top{
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translate(-50%, 0); 
            width: 60px;
        }
        .input-bottom{
            position: absolute;
            bottom: 0px;
            left: 50%;
            transform: translate(-50%, 0); 
            width: 60px;
        }
        .input-left{
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translate(0, -50%); 
            width: 60px;
        }
        .input-right{
            position: absolute;
            right: 0px;
            top: 50%;
            transform: translate(0, -50%); 
            width: 60px;
        }
    }
</style>
