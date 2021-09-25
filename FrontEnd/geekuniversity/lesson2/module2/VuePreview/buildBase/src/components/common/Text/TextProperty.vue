<template>
    <div class="compo-text-property">
        <div>
            <div class="line-item">
                <span class="label">文字</span>
                <textarea class="input-item textarea" placeholder="请输入文字" v-model="formData.text" @change="valueChange"></textarea>
            </div>
            <div class="line-item">
                <span class="label">文字链接</span>
                <input class="input-item" type="text" placeholder="请输入文字链接" v-model="formData.link" @change="valueChange"></input>
            </div>
            <div class="split"></div>
            <div class="line-item">
                <span class="label">字体大小</span>
                <input class="input-item" type="number" :min="0" :max="256" placeholder="请输入字体大小" v-model="formData.fontSize" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">字体颜色</span>
                <input class="input-item" type="color" placeholder="请输入字体颜色" v-model="formData.color" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">文字对齐</span>
                <el-radio-group class="item-radiogroup" v-model="formData.textAlign" @change="valueChange">
                    <el-radio-button label="左"></el-radio-button>
                    <el-radio-button label="中"></el-radio-button>
                    <el-radio-button label="右"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="line-item">
                <span class="label">样式</span>
                <el-button-group>
                    <el-button :type="formData.fontBold ? 'primary' : ''" @click="doBold">加粗</el-button>
                    <el-button :type="formData.fontItalic ? 'primary' : ''" @click="doItalic">斜体</el-button>
                    <el-button :type="formData.fontUnderline ? 'primary' : ''" @click="doUnderline">下划线</el-button>
                </el-button-group>
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
            <div class="line-item">
                <span class="label">行距</span>
                <input class="input-item" type="number" :min="0" :max="256" placeholder="请输入字体大小" v-model="formData.lineHeight" @change="valueChange"></input>
            </div>
            <div class="split"></div>
            <div class="line-item">
                <span class="label">旋转</span>
                <el-slider class="item-slide" v-model="formData.rotate" :min="-180" :max="180" :step="1" @input="valueChange"></el-slider><input type="text" class="input-item mini" v-model="formData.rotate" readonly/>度
            </div>
            <div class="line-item">
                <span class="label">透明度</span>
                <el-slider class="item-slide" v-model="formData.opacity" :min="0" :max="1" :step="0.1" @input="valueChange"></el-slider><input type="text" class="input-item mini" v-model="formData.opacity" readonly/>
            </div>
            </div>
            <div class="split"></div>
            <div class="line-item">
                <span class="label">阴影</span>
                <span class="shadow-box">
                    <xp-style-shadow :change="shadowChange" :shadow="formData.textShadow"></xp-style-border>
                </span>
            </div>
        </div>
    </div>

</template>

<script>
import StyleShadow from '../StyleShadow/StyleShadow';
export default {
    name: 'xp-text-property',
    components: {
        'xp-style-shadow': StyleShadow
    },
    props: {
        text: {
            type: String,
            require: true
        },
        fontSize: {
            type: Number,
            default: () => 14,
            require: false
        },
        color: {
            type: String,
            default: () => '#333333',
            require: false
        },
        textAlign: {
            type: String,
            default: () => 'left',
            require: false
        },
        fontStyle: {
            type: String,
            require: false
        },
        paddingTop: {
            type: Number,
            default: 0,
            require: false
        },
        paddingLeft: {
            type: Number,
            default: 0,
            require: false
        },
        paddingRight: {
            type: Number,
            default: 0,
            require: false
        },
        paddingBottom: {
            type: Number,
            default: 0,
            require: false
        },
        lineHeight: {
            type: Number,
            default: 1.5,
            require: false
        },
        link: {
            type: String,
            require: false
        },
        rotate: {
            type: Number,
            default: 0,
            require: false
        },
        opacity: {
            type: Number,
            default: 1,
            require: false
        },
        textShadow: {
            type: String,
            require: false
        }
    },
    data() {
        return {
            formData: {
                text: this.text,
                fontSize: this.fontSize,
                color: this.color,
                textAlign: this.textAlign,
                fontStyle: this.fontStyle,
                paddingTop: this.paddingTop,
                paddingLeft: this.paddingLeft,
                paddingRight: this.paddingRight,
                paddingBottom: this.paddingBottom,
                lineHeight: this.lineHeight,
                rotate: this.rotate,
                opacity: this.opacity,
                background: this.background,
                link: this.link,
                textShadow: this.textShadow,
                fontBold: false,
                fontItalic: false,
                fontUnderline: false
            }
        };
    },
    methods: {
        shadowChange(val){
            console.log(val);
            this.formData.textShadow = val;
            this.valueChange();
        },
        valueChange(){
            this.formData.fontStyle = 'none';
            if(this.formData.fontBold){
                this.formData.fontStyle = 'font-weight: bold';
            } 
            if(this.formData.fontItalic){
                this.formData.fontStyle = 'font-style: italic';
            }
            if(this.formData.fontUnderline){
                this.formData.fontStyle = 'text-decoration: underline';
            }
            this.dispatchPropertyChange(this.formData);
        },
        doBold(){
            this.formData.fontBold = !this.formData.fontBold;
            this.valueChange();
        },
        doItalic(){
            this.formData.fontItalic = !this.formData.fontItalic;
            this.valueChange();
        },
        doUnderline(){
            this.formData.fontUnderline = !this.formData.fontUnderline;
            this.valueChange();
        }
    }
}
</script>

<style>
    .compo-text-property .line-item{
        padding: 6px 0;
    }
    .compo-text-property .line-item .label{
        display: inline-block;
        padding-right: 5px;
        width: 70px;
        text-align: right;
        font-size: 14px;
        vertical-align: middle;
        color: #222;
    }
    .compo-text-property .input-item{
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
    .compo-text-property .input-item.textarea{
        width: 250px;
        height: 80px;
    }
    .compo-text-property .input-item:hover {
        border-color: #8492A6;
    }
    .compo-text-property .input-item:focus {
        outline: 0;
        border-color: #20a0ff;
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
