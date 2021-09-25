<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <el-switch :width="90" v-model="val" on-text="开" off-text="关"></el-switch>
    </div>
</template>

<script>
import {Switch} from 'element-ui'
export default {
    name: 'xp-input-switch',
    components: {
        'el-switch': Switch
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
            type: Boolean,
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
        }
    },
    data(){
        return {
            val: this.value
        }
    },
    watch: {
        val: function(val, oldVal){
            this.valueChange && this.valueChange(this.name, this.val, 'InputSwitch');
        }
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = false;
            this.valueChange && this.valueChange(this.name, false, 'InputSwitch');
        })
    }
}
</script>
