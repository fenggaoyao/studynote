<template>
    <el-dialog title="上传组件" v-model="newshow" :modal="true" @close="closefn" size="small" :close-on-click-modal="false">
        
        <div class="shaft-intro">
            请使用<a href="">组件开发脚手架工具</a>开发组件
        </div>
        
        <el-form>
            <el-form-item label="组件名称" label-width="80px">
                <el-input placeholder="请输入组件名称" v-model="title"></el-input>
            </el-form-item>

            <el-form-item label="标签名称" label-width="80px">
                <el-input placeholder="只允许英文加中划线，如：xp-new-component" v-model="name"></el-input>
            </el-form-item>

            <el-form-item label="组件描述" label-width="80px">
                <el-input placeholder="请输入组件描述" v-model="description"></el-input>
            </el-form-item>

            <el-form-item label="组件分类" label-width="80px">
                <el-select v-model="category" placeholder="请选择">
                    <el-option v-for="item in categories" :key=" 'category_' + item.value " :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="上传" label-width="80px" class="compo-up">
                <el-upload action="/api/upload/component" type="drag" accept=".zip" :with-credentials="true" :multiple="false" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :default-file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传脚手架打包后的zip包文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>

        <div class="dialog-footer">
            <el-button @click="closefn">取消</el-button>
            <el-button type="primary" class="create" @click="create">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import api from 'api'
import {Message} from 'element-ui'

export default {
    name: 'xp-new-component',
    data() {
        return {
            newshow: true,
            title: '',
            name: '',
            description: '',
            path: '',
            fileList: [
            ],
            categories: [{
                value: 'self',
                label: '个人'
            }, {
                value: 'pinzhi',
                label: '质享',
                disabled: true
            }, {
                value: 'zhinan',
                label: '指南',
                disabled: true
            }, {
                value: 'supermarket',
                label: '商超',
                disabled: true
            }, {
                value: 'common',
                label: '通用基础组件',
                disabled: true
            }, {
                value: 'business',
                label: '通用业务组件',
                disabled: true
            }],
            category: 'self'
        }
    },

    methods: {
        closefn() {
            this.destroy();
        },

        handleSuccess(data) {
            this.path = data.path;
            let up = document.querySelector('.compo-up .el-upload__inner');
            if(up){
                up.style.display = 'none';
            }
        },

        handleError(data) {
            Message({
                message: '上传失败',
                type: 'error'
            });
        },

        handleRemove() {
            let up = document.querySelector('.compo-up .el-upload__inner');
            if(up){
                up.style.display = 'block';
            }
        },

        create() {
            let me = this;
            if(!this.title){
                this.$notify.info({
                    title: '消息',
                    message: '请填写组件名称'
                });
                return;
            }
            if(!this.name){
                this.$notify.info({
                    title: '消息',
                    message: '请填写组件名称'
                });
                return;
            }
            if(!this.path){
                this.$notify.info({
                    title: '消息',
                    message: '请上传组件'
                });
                return;
            }
            api.addComponent({
                component_name: this.name,
                component_path: this.path,
                component_version: '1.0.0',
                component_category: this.category,
                component_doc: '',
                component_image: '',
                component_discription: this.title,
                component_is_public: 0,
                component_is_common: 0
            }).then(data => {
                if(data.error_no == 0){
                    Message({
                        message: '组件上传成功',
                        type: 'success'
                    });
                    eventHub.$emit('xp-add-component');
                    me.closefn();
                }
            })
        }
    }
}
</script>

<style lang="less-loader">
    .shaft-intro{
        position: absolute;
        left: 100px;
        top: 14px;
        border-radius: 4px;
        padding: 5px 10px;
        margin: 0 0 20px 0;
        text-align: center;
        a{
            border: 1px #e0e0e0 solid;
            border-radius: 4px;
            margin-left: 5px;
            margin-right: 5px;
        }
    }
    .dialog-footer{
        text-align: right;
    }
</style>
