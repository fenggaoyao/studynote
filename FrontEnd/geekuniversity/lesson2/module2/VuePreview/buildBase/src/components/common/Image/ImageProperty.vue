<template>
    <div class="compo-image-property">
        <div class="line-item">
            <span class="label">图片地址</span>
            <xp-image-upload :src="formData.src" :change="srcChange"></xp-image-upload>
        </div>
        <div class="line-item">
            <span class="label">图片链接</span>
            <input class="input-item" type="text" placeholder="请输入图片链接" v-model="formData.link" @change="valueChange"></input>
        </div>
        <div class="split"></div>
        <div class="line-item">
            <span class="label">图片宽度</span>
            <input class="input-item" type="text" placeholder="请输入图片宽度" v-model="formData.width" @change="valueChange"></input>
        </div>
        <div class="line-item">
            <span class="label">图片高度</span>
            <input class="input-item" type="text" placeholder="请输入图片高度" v-model="formData.height" @change="valueChange"></input>
        </div>
        <div class="split"></div>
        <div class="line-item">
            <span class="label">定位</span>
            <xp-style-position :position="formData.position" :left="formData.left" :right="formData.right" :top="formData.top" :bottom="formData.bottom" :change="positionChange"></xp-style-position>
        </div>
        <div class="line-item">
            <span class="label">外边距</span>
            <span class="pad-box">
                <input class="input-item top" placeholder="上边距" v-model="formData.marginTop" @change="valueChange"></input>
                <input class="input-item bottom" placeholder="下边距" v-model="formData.marginBottom" @change="valueChange"></input>
                <input class="input-item left" placeholder="左边距" v-model="formData.marginLeft" @change="valueChange"></input>
                <input class="input-item right" placeholder="右边距" v-model="formData.marginRight" @change="valueChange"></input>
            </span>
        </div>
        <div class="line-item">
            <span class="label">z-index</span>
            <input class="input-item" type="number" placeholder="z-index" v-model="formData.zIndex" @change="valueChange"></input>
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

</template>

<script>
import StylePosition from '../StylePosition/StylePosition';
import ImageUpload from '../ImageUpload/ImageUpload';
export default {
    name: 'xp-image-property',
    components: {
        'xp-style-position': StylePosition,
        'xp-image-upload': ImageUpload
    },
    props: {
        src: {
            type: String,
            require: true
        },
        position: {
            type: String,
            default: 'static',
            require: false
        },
        left: {
            default: 0,
            require: false
        },
        right: {
            default: 0,
            require: false
        },
        top: {
            default: 0,
            require: false
        },
        bottom: {
            default: 0,
            require: false
        },
        width: {
            require: false,
            default: () => '100%'
        },
        height: {
            require: false
        },
        marginTop: {
            default: 0,
            require: false
        },
        marginLeft: {
            default: 0,
            require: false
        },
        marginRight: {
            default: 0,
            require: false
        },
        marginBottom: {
            default: 0,
            require: false
        },
        link: {
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
        zIndex: {
            type: Number,
            default: 1,
            require: false
        }
    },
    data() {
        return {
            formData: {
                src: this.src,
                position: this.position,
                left: this.left,
                right: this.right,
                top: this.top,
                bottom: this.bottom,
                width: this.width,
                height: this.height,
                marginTop: this.marginTop,
                marginLeft: this.marginLeft,
                marginRight: this.marginRight,
                marginBottom: this.marginBottom,
                link: this.link,
                rotate: this.rotate,
                opacity: this.opacity,
                zIndex: this.zIndex
            }
        }
    },
    methods: {
        valueChange(){
            this.dispatchPropertyChange(this.formData);
        },
        positionChange(val){
            this.formData.position = val.position;
            this.formData.left = val.left;
            this.formData.right = val.right;
            this.formData.top = val.top;
            this.formData.bottom = val.bottom;
            if(val.position == 'absolute'){
                this.formData.zIndex = this.nextZIndex();
            } else {
                this.formData.zIndex = 0;
            }
            this.valueChange();
        },
        srcChange(val){
            this.formData.src = val;
            this.valueChange();
        }
    }
}
</script>
<style>
    .compo-image-property .line-item{
        padding: 6px 0;
    }
    .compo-image-property .line-item .label{
        display: inline-block;
        padding-right: 5px;
        width: 70px;
        text-align: right;
        font-size: 14px;
        vertical-align: middle;
        color: #222;
    }
    .compo-image-property .input-item{
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
    .compo-image-property .input-item.textarea{
        width: 200px;
        height: 50px;
    }
    .compo-image-property .input-item:hover {
        border-color: #8492A6;
    }
    .compo-image-property .input-item:focus {
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
</style>
