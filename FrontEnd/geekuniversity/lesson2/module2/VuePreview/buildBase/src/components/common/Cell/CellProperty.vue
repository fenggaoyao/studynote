<template>
    <div class="compo-block-property">
        <div>
            <div class="line-item">
                <span class="label">flex</span>
                <input class="input-item" type="number" placeholder="flex" v-model="formData.flex" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">高度</span>
                <input class="input-item" type="number" placeholder="高度" v-model="formData.height" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">背景</span>
                <xp-style-background :change="backgroundChange" :background="background"></xp-style-background>
            </div>
            <div class="split"></div>
            <div class="line-item">
                <span class="label">文字对齐</span>
                <el-radio-group class="item-radiogroup" v-model="formData.textAlign" @change="valueChange">
                    <el-radio-button label="左"></el-radio-button>
                    <el-radio-button label="中"></el-radio-button>
                    <el-radio-button label="右"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="split"></div>
            <div class="line-item">
                <span class="label">内边距</span>
                <span class="pad-box">
                    <input class="input-item top" type="number" placeholder="上边距" v-model="formData.paddingTop" @change="valueChange"></input>
                    <input class="input-item bottom" type="number" placeholder="下边距" v-model="formData.paddingBottom" @change="valueChange"></input>
                    <input class="input-item left" type="number" placeholder="左边距" v-model="formData.paddingLeft" @change="valueChange"></input>
                    <input class="input-item right" type="number" placeholder="右边距" v-model="formData.paddingRight" @change="valueChange"></input>
                </span>
            </div>
            <div class="split"></div>
            <div class="line-item">
                <span class="label">边框</span>
                <xp-style-border :change="borderChange" :border="formData.border"></xp-style-border>
            </div>
            <div class="line-item">
                <span class="label">圆角</span>
                <input class="input-item top" type="number" placeholder="圆角" v-model="formData.borderRadius" @change="valueChange"></input>
            </div>
            <div class="split"></div>
            <div class="line-item">
                <span class="label">阴影</span>
                <span class="shadow-box">
                    <xp-style-shadow :change="shadowChange" :shadow="formData.boxShadow"></xp-style-border>
                </span>
            </div>
        </div>
    </div>

</template>

<script>
import StyleBorder from '../StyleBorder/StyleBorder';
import StyleShadow from '../StyleShadow/StyleShadow';
import StyleBackground from '../StyleBackground/StyleBackground';
export default {
    name: 'xp-block-property',
    components: {
        'xp-style-border': StyleBorder,
        'xp-style-shadow': StyleShadow,
        'xp-style-background': StyleBackground
    },
    props: {
        flex: {
            type: Number,
            default: 1,
            require: false
        },
        height: {
            type: Number,
            default: 0,
            require: false
        },
        textAlign: {
            type: String,
            default: 'left',
            require: false
        },
        paddingTop: {
            type: Number,
            default: 10,
            require: false
        },
        paddingLeft: {
            type: Number,
            default: 10,
            require: false
        },
        paddingRight: {
            type: Number,
            default: 10,
            require: false
        },
        paddingBottom: {
            type: Number,
            default: 10,
            require: false
        },
        border: {
            type: String,
            default: '1px #cccccc solid',
            require: false
        },
        borderRadius: {
            type: Number,
            default: 0,
            require: false
        },
        boxShadow: {
            type: String,
            require: false
        },
        background: {
            type: String,
            require: false
        }
    },
    data() {
        return {
            formData: {
                flex: this.flex,
                height: this.height,
                textAlign: this.textAlign,
                paddingTop: this.paddingTop,
                paddingLeft: this.paddingLeft,
                paddingRight: this.paddingRight,
                paddingBottom: this.paddingBottom,
                background: this.background,
                boxShadow: this.boxShadow,
                border: this.border,
                borderRadius: this.borderRadius
            },
            showShadow: false
        };
    },
    methods: {
        valueChange(){
            this.dispatchPropertyChange(this.formData);
        },
        borderChange(val){
            this.formData.border = val;
            this.valueChange();
        },
        shadowChange(val){
            this.formData.boxShadow = val;
            this.valueChange();
        },
        backgroundChange(val){
            this.formData.background = val;
            this.valueChange();
        }
    }
}
</script>

<style>
    .compo-block-property .line-item{
        padding: 6px 0;
    }
    .compo-block-property .line-item .label{
        display: inline-block;
        padding-right: 5px;
        width: 70px;
        text-align: right;
        font-size: 14px;
        vertical-align: middle;
        color: #222;
    }
    .compo-block-property .input-item{
        display: inline-block;
        padding: 3px 10px;
        box-sizing: border-box;
        color: #1f2d3d;
        height: 34px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        outline: 0;
        line-height: normal;
        vertical-align: middle;
    }
    .compo-block-property .input-item.textarea{
        width: 200px;
        height: 50px;
    }
    .compo-block-property .input-item:hover {
        border-color: #8492A6;
    }
    .compo-block-property .input-item:focus {
        outline: 0;
        border-color: #20a0ff;
    }
    .item-slide{
        width: 60%;
        padding: 0 10px;
        display: inline-block;
        vertical-align: middle;
    }
    .mini{
        width: 60px;
        margin-right: 5px;
    }
    .item-radiogroup{
        vertical-align: middle;
    }
</style>
