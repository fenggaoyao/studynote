<template>
    <span class="compo-stylebackground">
        <p>背景颜色：<input class="input-item" type="color" placeholder="请选择颜色" v-model="color"></input></p>
        <p>背景图片：<input class="input-item" type="text" placeholder="请选择背景图片" v-model="image"></input></p>
        <p>
            图片填充：<span class="sb-select">
            <el-select v-model="repeat" placeholder="请选择填充类型">
                <el-option label="重复" value="repeat"></el-option>
                <el-option label="水平方向重复" value="repeat-x"></el-option>
                <el-option label="垂直方向重复" value="repeat-y"></el-option>
                <el-option label="伸缩" value="100%"></el-option>
            </el-select></span>
        </p>
    </span>
</template>

<script>
export default {
    name: 'xp-style-background',
    props: {
        change: {
            type: Function,
            require: false
        },
        background: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
    },
    data(){
        let parts = this.background.split(' ');
        let da = {
            color: parts[0] || '',
            image: parts[1] || '',
            repeat: parts[2] || ''
        };
        if(da.image){
            da.image = da.image.replace(/^url\(/, '').replace(/\)$/, '');
        }
        return da;
    },
    watch: {
        'color': function(val, oldVal){
            this.change && this.change(`${this.color} url(${this.image}) ${this.repeat}`, 'StyleBackground')
        },
        'image': function(val, oldVal){
            this.change && this.change(`${this.color} url(${this.image}) ${this.repeat}`, 'StyleBackground')
        },
        'repeat': function(val, oldVal){
            this.change && this.change(`${this.color} url(${this.image}) ${this.repeat}`, 'StyleBackground')
        }
    },
    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.change && this.change('', 'StyleBackground');
        })
    }
}
</script>

<style>
    .compo-stylebackground{
        display: inline-block;
        vertical-align: top;
        padding: 2px;
        width: 79%;
    }
    .compo-stylebackground-content{
        padding: 5px;
    }
    .sb-select{
        display: inline-block;
        vertical-align: middle;
    }
</style>