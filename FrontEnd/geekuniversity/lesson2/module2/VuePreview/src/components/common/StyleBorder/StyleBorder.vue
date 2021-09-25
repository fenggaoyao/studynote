<template>
    <span class="compo-styleborder">
        <p>颜色：<input class="input-item" type="color" placeholder="请选择颜色" v-model="color"></input></p>
        <p>粗细：<input class="input-item" type="number" :min="0" :max="256" placeholder="请输入边框宽度" v-model="width"></input>
        <p>
            类型：<span class="sb-select">
            <el-select v-model="style" placeholder="请选择边框类型">
                <el-option label="点线" value="dotted"></el-option>
                <el-option label="实线" value="solid"></el-option>
                <el-option label="双线" value="double"></el-option>
                <el-option label="虚线" value="dashed"></el-option>
            </el-select></span>
        </p>
    </span>
</template>

<script>
export default {
    name: 'xp-style-border',
    props: {
        change: {
            type: Function,
            require: true
        },
        border: {
            type: String,
        }
    },
    data(){
        let color = '#ccc';
        let width = 1;
        let style = 'solid';
        
        if(this.border && this.border != 'none'){
            let mats = this.border.match(/(#[0-9a-f]{6})|(#[0-9a-f]{3})/);
            if(mats && mats.length > 0){
                let b = mats[1].trim() + ' ' + this.border.replace(mats[1], '').trim();
                b = b.replace(/\s{2,}/g, ' ');
                let s = b.split(' ');
                s[0] && (color = s[0].trim());
                s[1] && (width = s[1].replace('px', '').trim());
                s[2] && (style = s[2].trim());
            }
        }
        return {
            color: color,
            width: width,
            style: style,
        };
    },
    watch: {
        'color': function(val, oldVal){
            this.change([this.color, this.width + 'px', this.style].join(' '));
        },
        'width': function(val, oldVal){
            this.change([this.color, this.width + 'px', this.style].join(' '));
        },
        'style': function(val, oldVal){
            this.change([this.color, this.width + 'px', this.style].join(' '));
        }
    }
}
</script>

<style>
    .compo-styleborder{
        display: inline-block;
        vertical-align: top;
        padding: 2px;
    }
    .sb-select{
        display: inline-block;
        vertical-align: middle;
    }
</style>