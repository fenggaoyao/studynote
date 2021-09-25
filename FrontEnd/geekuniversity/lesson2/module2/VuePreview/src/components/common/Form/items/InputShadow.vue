<template>
    <div class="line-item">
        <span class="label">{{title}}</span>

        <span class="compo-input-shadow">
            <el-switch v-model="showShadow" on-text="开" off-text="关"></el-switch>
            <div class="compo-styleshadow-content" v-if="showShadow">
                <p>颜色：<input class="input-item c" type="color" placeholder="请选择颜色" v-model="color"></input></p>
                <p>X偏移：<input class="input-item x" type="number" placeholder="X偏移" v-model="x"></input></p>
                <p>Y偏移：<input class="input-item x" type="number" placeholder="Y偏移" v-model="y"></input></p>
                <p>模糊：<input class="input-item x" type="number" placeholder="模糊" v-model="blur"></input></p>
            </div>
        </span>

    </div>
</template>

<script>
import {Switch} from 'element-ui'
export default {
    name: 'xp-input-shadow',
    components: {
      'el-switch': Switch
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
        let color = '#ffffff';
        let x = 0;
        let y = 0;
        let blur = 0;
        let ss = false;

        if(this.shadow){
            let mats = this.shadow.match(/(#[0-9a-f]{6})|(rgb\(.*?\))|(rgba\(.*?\))/);
            if(mats.length > 0){
                this.shadow = mats[1].trim() + ' ' +  this.shadow.replace(mats[1], '').trim();
                let s = this.shadow.split(' ');
                color = s[0];
                x = s[1].replace('px', '');
                y = s[2].replace('px', '');
                blur = s[3].replace('px', '');
                ss = true;
            }
        }
        return {
            color: color,
            blur: blur,
            x: x,
            y: y,
            showShadow: ss
        };
    },
    methods: {
        inputChange(e){
            if(this.val != ''){
                let shadow = [this.color, this.x + 'px', this.y + 'px', this.blur + 'px'].join(' ');
                this.valueChange && this.valueChange(this.name, shadow, 'InputBorder');
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
    .compo-input-shadow{
        display: inline-block;
        vertical-align: top;

        .c{
            width: 50px;
        }
        .x{
            width: 100px;
        }
    }
</style>