<template>
    <div class="compo-shop-cart-property">
        <div>
            <div class="line-item">
                <span class="label">无商品图片地址</span>
                <xp-image-upload :src="formData.emptyImage" :change="emptySrcChange"></xp-image-upload>
            </div>
            <div class="line-item">
                <span class="label">有商品图片地址</span>
                <xp-image-upload :src="formData.image" :change="srcChange"></xp-image-upload>
            </div>
            <div class="line-item">
                <span class="label">跳转链接</span>
                <input class="input-item" type="text" placeholder="请输入图片链接" v-model="formData.link" @change="valueChange"></input>
            </div>
            
            <div class="split"></div>
            <div class="line-item">
                <span class="label">宽度</span>
                <input class="input-item" type="text" placeholder="请输入宽度" v-model="formData.width" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">高度</span>
                <input class="input-item" type="text" placeholder="请输入高度" v-model="formData.height" @change="valueChange"></input>
            </div>
            <div class="line-item">
            <span class="label">定位</span>
            <span class="pad-box">
                <input class="input-item top" placeholder="上" v-model="formData.top" @change="valueChange"></input>
                <input class="input-item bottom" placeholder="下" v-model="formData.bottom" @change="valueChange"></input>
                <input class="input-item left" placeholder="左" v-model="formData.left" @change="valueChange"></input>
                <input class="input-item right" placeholder="右" v-model="formData.right" @change="valueChange"></input>
            </span>
        </div>
        </div>
    </div>

</template>

<script>
import StylePosition from 'components/common/StylePosition/StylePosition';
import ImageUpload from 'components/common/ImageUpload/ImageUpload';

export default {
    name: 'xp-shop-cart-property',
    components: {
        'xp-style-position': StylePosition,
        'xp-image-upload': ImageUpload
    },
    props: {
        image: {
            type: String,
            default: 'http://img.waimai.baidu.com/pb/fc12c35df768111793aa07d9bb95ab707c@f_png,w_100,h_100',
            require: false
        },
        emptyImage: {
            type: String,
            default: 'http://img.waimai.baidu.com/pb/72dc34a27a3676828a8e9cf6d7fac88f31@f_png,w_100,h_100',
            require: false
        },
        link: {
            type: String,
            default: 'http://waimai.baidu.com/static/pinzhi2/index.html#/shopCart/detail',
            require: false
        },
        width: {
            default: 52,
            require: false
        },
        height: {
            default: 52,
            require: false
        },
        left: {
            default: 20,
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
            default: 20,
            require: true
        }
    },
    data() {
        return {
            formData: {
                image: this.image,
                emptyImage: this.emptyImage,
                link: this.link,
                left: this.left,
                right: this.right,
                top: this.top,
                bottom: this.bottom,
                width: this.width,
                height: this.height
            }
        };
    },
    methods: {
        valueChange(){
            this.dispatchPropertyChange(this.formData);
        },
        srcChange(val){
            this.formData.image = val;
            this.valueChange();
        },
        emptySrcChange(val){
            this.formData.emptyImage = val;
            this.valueChange();
        }
    }
}
</script>

<style lang="less-loader">

    .compo-shop-cart-property{

        .line-item{
            padding: 6px 0;

            .label{
                display: inline-block;
                padding-right: 5px;
                width: 70px;
                text-align: right;
                font-size: 14px;
                vertical-align: middle;
                color: #222;
            }
        }
        
        .input-item{
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
        .input-item.textarea{
            width: 200px;
            height: 50px;
        }
        .input-item:hover {
            border-color: #8492A6;
        }
        .input-item:focus {
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
    }
</style>
