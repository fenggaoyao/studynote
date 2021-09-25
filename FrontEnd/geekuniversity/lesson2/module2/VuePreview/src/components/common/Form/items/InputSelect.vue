<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <span class="select-area">
            <el-select v-model="val" placeholder="请选择">
                <el-option label="" value=""></el-option>
                <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </span>
        
    </div>
</template>

<script>
import {Select, Option} from 'element-ui'
export default {
    name: 'xp-input-select',
    components: {
        'el-select': Select,
        'el-option': Option
    },
    props: {
        title: {
            type: String,
            default: '',
            required: false
        },
        name: {
            type: String,
            required: true
        },
        component: {
            type: String,
            default: 'text',
            required: false
        },
        value: {
            required: false
        },
        valueChange: {
            type: Function,
            require: false
        },
        validate: {
            type: String,
            default: () => '',
            required: false
        },
        options: {
            type: Array,
            default: [],
            required: false
        }
    },
    data(){
        return {
            val: ''
        }
    },
    methods: {
        inputChange(e){
          this.valueChange && this.valueChange(this.name, this.val, 'InputSelect');
        },
    },

    watch: {
      val (val, oldVal) {
        this.inputChange();
      }
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, 0, 'InputSelect');
        })
    }
}
</script>

<style type="less-loader">
    .select-area {
        display: inline-block;
        vertical-align: middle;
    }
</style>
