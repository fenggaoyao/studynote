<template>
    <div class="compo-imgUpload">
        <input class="input-item" type="text" placeholder="图片地址" v-model="uploadUrl"></input>
        <div class="upload-item">
            <el-upload action="/api/upload/photo" :with-credentials="true" accept="image/*" :show-upload-list="false" :on-success="handleSuccess" :on-error="handleError">
                <el-button type="primary">点击上传</el-button>
            </el-upload>
        </div>
    </div>
</template>

<script>
import {Upload, Button} from 'element-ui'
export default {
    name: 'xp-image-upload',
    components: {
      'el-upload': Upload,
      'el-button': Button
    },
    props: {
        src: {
            type: String,
            require: false
        },
        change: {
            type: Function,
            require: true
        }
    },

    data() {
        return {
            newshow: true,
            name: '',
            uploadUrl: this.src,
        }
    },

    methods: {
        handleSuccess(data) {
            if(data.error_no == '0'){
                this.uploadUrl = data.result.url;
            }
        },

        handleError(data) {

        }
    },

    watch: {
        uploadUrl(val, oldVal){
            this.change(val);
        }
    }
}
</script>

<style lang="less-loader">
    .compo-imgUpload{
        display: inline-block;
        vertical-align: top;

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
            width: 200px;
        }

        .input-item:hover {
            border-color: #8492A6;
        }

        .input-item:focus {
            outline: 0;
            border-color: #20a0ff;
        }

        .upload-item{
            display: inline-block;
            width: 70px;
            vertical-align: middle;

            .el-upload-list.el-upload-list--text{
                display: none;
            }
        }
    }
</style>
