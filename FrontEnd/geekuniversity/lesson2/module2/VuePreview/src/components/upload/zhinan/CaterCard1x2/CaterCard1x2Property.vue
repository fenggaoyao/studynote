<template>
    <div class="compo-cater-card-property-1x1">
        <div>
            <div class="line-item">
                <span class="label">图片</span>
                <xp-image-upload :src="formData.image" :change="srcChange"></xp-image-upload>
            </div>
            <div class="split"></div>
            <div class="line-item">
                <span class="label">名称</span>
                <input class="input-item" type="text" placeholder="请输入名称" v-model="formData.name" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">地址</span>
                <input class="input-item" type="text" placeholder="请输入地址" v-model="formData.address" @change="valueChange"></input>
            </div>
        </div>
    </div>

</template>

<script>
import ImageUpload from 'components/common/ImageUpload/ImageUpload';
export default {
    name: 'xp-cater-card-1x2-property',
    components: {
        'xp-image-upload': ImageUpload
    },
    props: {
        image: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        },
        link: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            formData: {
                image: this.image,
                name: this.name,
                address: this.address,
                link: this.link
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
        }
    }
}
</script>

<style lang="less-loader">
    .compo-cater-card-property-1x1{
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
