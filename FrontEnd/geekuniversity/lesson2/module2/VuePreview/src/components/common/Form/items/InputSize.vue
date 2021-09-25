<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <input class="input-item" type="Number"
               :placeholder="title"
               v-model="number"
               @change="inputChange"
               @blur="inputChange"
               @input="inputChange"/>
        <el-select v-model="unit" placeholder="请选择"
            style="display: inline-block;padding: 3px 10px;width: 90px;">
            <el-option
                    v-for="item in ['px', 'rem', '%']"
                    :key="item"
                    :label="item"
                    :value="item">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import {Select} from 'element-ui'
export default {
    name: 'xp-input-size',
    components: {
        'el-select': Select
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
            type: String,
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
    data() {
        let number
        let unit
        if (this.value) {
            number = this.value.replace(/[^0-9]/ig, '') || undefined
            if (number) {
                number = parseInt(number, 10)
            }
            unit = this.value.replace(/[^a-zA-Z]/ig, '')
        }

        return {
            number: number,
            unit: unit || 'px',
        }
    },
    computed: {
    },
    methods: {
        inputChange(e) {
            if (this.number || this.number === 0) {
                this.valueChange && this.valueChange(this.name, this.number + this.unit, 'InputSize');
            }
        },
    },

    created(){
        eventHub.$on('xp-reset', () => {
            this.number = undefined
            this.unit = 'px'
            this.valueChange && this.valueChange(this.name, '', 'InputSize');
        })
    }
}
</script>

<style scoped>
    .el-input__inner {
        height: 34px !important;
    }
</style>
