<template>
    <div class="line-item">
        <span class="label">{{title}}</span>

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

    </div>
</template>

<script>
import {Select} from 'element-ui'
export default {
    name: 'xp-input-background',
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
    data(){
        let parts = [];
        if(this.value){
            parts = this.value.split(' ');
        }
        let da = {
            color: parts[0] || '#ffffff',
            image: parts[1] || '',
            repeat: parts[2] || ''
        };
        if(da.image){
            da.image = da.image.replace(/^url\(/, '').replace(/\)$/, '');
        }
        return da;
    },
    methos: {
        inputChange(e){
            let c = this.color || '';
            let img = this.image ? 'url(' + this.image + ')' : '';
            let r = this.repeat || '';
            this.valueChange([c, img, r].join(' '));
        },
    },
    watch: {
        value(val, oldVal){
            let parts = val.split(' ');
            let da = {
                color: parts[0] || '#ffffff',
                image: parts[1] || '',
                repeat: parts[2] || ''
            };
            if(da.image){
                da.image = da.image.replace(/^url\(/, '').replace(/\)$/, '');
            }

            this.color = da.color;
            this.image = da.image;
            this.repeat = da.repeat;
        }
    }
}
</script>

<style lang="less-loader">

.compo-stylebackground{
    display: inline-block;
    vertical-align: top;
    padding: 2px;
    width: 79%;

    .compo-stylebackground-content{
        padding: 5px;
    }

    .sb-select{
        display: inline-block;
        vertical-align: middle;
    }
}
    
</style>