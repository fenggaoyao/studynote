<template>
    <div class="compo-share-property">
        <div>
            <div class="line-item">
                <span class="label">选项</span>
                <span class="right-area">
                    <el-checkbox-group v-model="formData.platforms" @change="valueChange">
                        <el-checkbox label="微信朋友圈"></el-checkbox>
                        <el-checkbox label="微信好友"></el-checkbox>
                        <el-checkbox label="复制链接"></el-checkbox>
                        <el-checkbox label="微博"></el-checkbox>
                        <el-checkbox label="QQ空间"></el-checkbox>
                        <el-checkbox label="QQ好友"></el-checkbox>
                    </el-checkbox-group>
                </span>
            </div>
            <div class="line-item">
                <span class="label">标题</span>
                <input class="input-item" placeholder="请输入标题" v-model="formData.title" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">描述</span>
                <input class="input-item" placeholder="请输入描述" v-model="formData.description" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">分享图片</span>
                <xp-image-upload :src="formData.image" :change="srcChange"></xp-image-upload>
            </div>
            <div class="line-item">
                <br/>
                支持百度外卖，百度糯米，手机百度，百度地图，百度钱包，度秘等平台分享<br>
                支持微信二次分享
            </div>
        </div>
    </div>

</template>

<script>
import ImageUpload from 'components/common/ImageUpload/ImageUpload'
import { Checkbox, CheckboxGroup } from 'element-ui'

export default {
    name: 'xp-share-property',
    components: {
        'xp-image-upload': ImageUpload,
        'el-checkbox': Checkbox,
        'el-checkbox-group': CheckboxGroup
    },
    props: {
        platforms: {
            type: Array,
            default: ['微信朋友圈', '微信好友'],
            require: false
        },
        title: {
            type: String,
            default: '',
            require: false
        },
        description: {
            type: String,
            default: '',
            require: false
        },
        image: {
            type: String,
            default: '',
            require: false
        }
    },
    data() {
        return {
            formData: {
                platforms: this.platforms,
                title: this.title,
                description: this.description,
                image: this.image
            }
        };
    },
    methods: {
        valueChange(platforms){
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
    .compo-share-property{

        .line-item{
            padding: 6px 0;
            white-space: nowrap;
        }
        .line-item .label{
            display: inline-block;
            padding-right: 5px;
            width: 70px;
            text-align: right;
            font-size: 14px;
            vertical-align: middle;
            color: #222;
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

        .right-area{
            display: inline-block;
            vertical-align: top;

            .el-checkbox-group{
                white-space: normal;
            }
        }
    }

</style>
