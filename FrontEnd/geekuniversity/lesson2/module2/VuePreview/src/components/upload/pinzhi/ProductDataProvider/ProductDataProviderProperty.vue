<template>
    <div class="compo-block-property">
        <div>
            </div>
            <div class="line-item">
                <span class="label">服务地址</span>
                <input class="input-item" type="text" placeholder="请输入服务地址" v-model="formData.url" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">商品id列表参数名</span>
                <input class="input-item" type="text" placeholder="请输入商品id列表参数" v-model="formData.param" @change="valueChange"></input>
            </div>
            <div class="line-item">
                <span class="label">模式</span>
                <el-radio-group v-model="formData.valueType" @change="valueChange">
                    <el-radio :label="1">单项目循环顺序赋值</el-radio>
                    <el-radio :label="2">多项目顺序赋值</el-radio>
                </el-radio-group>
            </div>
            <div v-if="formData.valueType == 2" class="line-item">
                请为容器内的每一个商品指定商品id
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'xp-product-data-provider-property',
    props: {
        url: {
            type: String,
            default: 'http://http://waimai.baidu.com/pinzhi/api/getiteminfobyids',
            require: false
        },
        param: {
            type: String,
            default: 'item_ids',
            require: false
        },
        valueType: {
            type: Number,
            default: '',
            require: false
        }
    },
    data() {
        return {
            formData: {
                url: this.url,
                param: this.param,
                valueType: this.valueType
            }
        };
    },
    methods: {
        valueChange(e){
            this.dispatchPropertyChange(this.formData);
        }
    },
    watch: {
        url(val, oldVal){
            this.formData.url = val;
        },
        param(val, oldVal){
            this.formData.param = val;
        },
        valueType(val, oldVal){
            this.formData.valueType = val;
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
