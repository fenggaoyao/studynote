<template>
    <el-dialog title="新建模版" v-model="newshow" @close="closefn" size="small" :close-on-click-modal="false">
        <el-form>
            <el-form-item label="模版名称" label-width="100px">
                <el-input placeholder="请输入组件名称" v-model="name"></el-input>
            </el-form-item>

            <el-form-item label="模版描述" label-width="100px">
                <el-input placeholder="请输入模版描述" v-model="description"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="closefn">取消</el-button>
            <el-button type="primary" class="create" @click="create">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import api from 'api'

export default {
    name: 'xp-new-template',
    data() {
        return {
            newshow: true,
            name: '',
            description: ''
        }
    },

    methods: {
        closefn() {
            this.destroy();
        },

        create() {
            let me = this;
            if(!this.name){
                this.$notify.info({
                    title: '消息',
                    message: '请填写模版名称'
                });
                return;
            }
            
            api.addModel({
                model_name: this.name,
                model_path: 'http://waimai.baidu.com',
                model_content: ' ',
                model_category: '0',
                model_discription: this.description || this.name,
                model_is_public: 2,
                model_is_common: 2
            }).then(data => {
                if(data.error_no == 0){
                    me.closefn();
                    location.hash = '/edit?modelId=' + data.result.model_id;
                }
            })
        }
    }
}
</script>
