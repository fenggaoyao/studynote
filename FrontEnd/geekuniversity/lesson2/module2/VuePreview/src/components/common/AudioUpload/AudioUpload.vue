<template>
    <div class="compo-audioUpload">
        <input class="input-item" type="text" placeholder="音频地址" v-model="uploadUrl"/>
        <div class="upload-item">
            <el-button type="primary">
                <router-link :to="'mediaUpload'" target="_blank" style="color: #fff;">点击上传</router-link>
            </el-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'xp-audio-upload',
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

<style>
    .compo-audioUpload{
        display: inline-block;
        vertical-align: top;
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
    }
</style>
