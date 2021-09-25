<template>
    <span class="compo-style-position">
        <el-switch :width="90" v-model="showShadow" on-text="自由定位" off-text="默认定位"></el-switch>
        <div class="pad-box" v-if="showShadow">
            <input class="input-item top" placeholder="上" v-model="formData.top" @change="valueChange"></input>
            <input class="input-item bottom" placeholder="下" v-model="formData.bottom" @change="valueChange"></input>
            <input class="input-item left" placeholder="左" v-model="formData.left" @change="valueChange"></input>
            <input class="input-item right" placeholder="右" v-model="formData.right" @change="valueChange"></input>
        </div>
    </span>
</template>

<script>
export default {
    name: 'xp-style-position',
    props: {
        change: {
            type: Function,
            require: true
        },
        position: {
            type: String,
            default: 'static'
        },
        left: {
            default: 0
        },
        right: {
            default: 0
        },
        top: {
            default: 0
        },
        bottom: {
            default: 0
        }
    },
    data() {
        return {
            formData: {
                position: this.position,
                left: this.left,
                right: this.right,
                top: this.top,
                bottom: this.bottom
            },
            showShadow: this.position == 'absolute' ? true : false
        }
    },
    created() {
    },
    methods: {
        valueChange(){
            this.change(this.formData);
        }
    },
    watch: {
        'showShadow': function(val, oldVal){
            if(!val){
                this.formData.position = 'static';
            } else {
                this.formData.position = 'absolute';
            }
            this.change(this.formData);
        }
    },
    updated(){
    }
}
</script>

<style>
    .compo-style-position{
        display: inline-block;
        vertical-align: top;
        padding: 2px;
        width: 79%;
    }
    .pad-box{
        display: inline-block;
        width: 174px;
        height: 100px;
        position: relative;
        vertical-align: middle;
    }
    .pad-box .top{
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translate(-50%, 0); 
        width: 60px;
    }
    .pad-box .bottom{
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%, 0); 
        width: 60px;
    }
    .pad-box .left{
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translate(0, -50%); 
        width: 60px;
    }
    .pad-box .right{
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translate(0, -50%); 
        width: 60px;
    }
</style>