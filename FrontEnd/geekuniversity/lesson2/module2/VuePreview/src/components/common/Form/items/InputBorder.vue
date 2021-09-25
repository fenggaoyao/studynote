<template>
    <div class="line-item">
        <span class="label">{{title}}</span>

        <span class="compo-input-border">
            <p>颜色：<input class="input-item c" type="color" placeholder="请选择颜色" v-model="color" @change="inputChange" @blur="inputChange" @input="inputChange"></input></p>
            <p>粗细：<input class="input-item w" type="number" placeholder="请输入边框宽度" v-model="width" @change="inputChange" @blur="inputChange" @input="inputChange"></input></p>
            <p>
                类型：<span class="sb-select">
                <el-select v-model="style" placeholder="请选择边框类型">
                    <el-option label="点线" value="dotted"></el-option>
                    <el-option label="实线" value="solid"></el-option>
                    <el-option label="双线" value="double"></el-option>
                    <el-option label="虚线" value="dashed"></el-option>
                </el-select></span>
            </p>
        </span>

    </div>
</template>

<script>
import {Select} from 'element-ui'
export default {
    name: 'xp-input-border',
    components: {
        'el-select': Select
    },
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
        let color = '#ccc';
        let width = 1;
        let style = 'solid';
        let showBorder = false;

        if(this.value && this.value != 'none'){
            let mats = this.value.match(/(#[0-9a-f]{6})|(#[0-9a-f]{3})/);
            if(mats && mats.length > 0){
                let b = mats[1].trim() + ' ' + this.value.replace(mats[1], '').trim();
                b = b.replace(/\s{2,}/g, ' ');
                let s = b.split(' ');
                s[0] && (color = s[0].trim());
                s[1] && (width = s[1].replace('px', '').trim());
                s[2] && (style = s[2].trim());
                showBorder = true;
            }
        }
        return {
            color,
            width,
            style,
            showBorder,
        };
    },
    methods: {
        inputChange(e){
            if(this.val != ''){
                let border = [this.color, this.width + 'px', this.style].join(' ');
                this.valueChange && this.valueChange(this.name, border, 'InputBorder');
            }
        },
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, 0, 'InputBorder');
        })
    }
}
</script>

<style lang="less-loader">
    .compo-input-border{
        display: inline-block;
        vertical-align: top;

        .c{
            width: 50px;
        }
        .w{
            width: 100px;
        }
    }
</style>