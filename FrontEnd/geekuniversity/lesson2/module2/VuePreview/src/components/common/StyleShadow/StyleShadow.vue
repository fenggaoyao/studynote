<template>
    <span class="compo-styleshadow">
        <el-switch v-model="showShadow" on-text="开" off-text="关"></el-switch>
        <div class="compo-styleshadow-content" v-if="showShadow">
            <p>颜色：<input class="input-item" type="color" placeholder="请选择颜色" v-model="color"></input></p>
            <p>X偏移：<input class="input-item" type="number" :min="-50" :max="50" placeholder="X偏移" v-model="x"></input></p>
            <p>Y偏移：<input class="input-item" type="number" :min="-50" :max="50" placeholder="Y偏移" v-model="y"></input></p>
            <p>模糊：<input class="input-item" type="number" :min="0" :max="100" placeholder="模糊" v-model="blur"></input></p>
        </div>
    </span>
</template>

<script>
export default {
    name: 'xp-style-shadow',
    props: {
        change: {
            type: Function,
            require: true
        },
        shadow: {
            type: String,
        }
    },
    data(){
        let color = '#ffffff';
        let x = 0;
        let y = 0;
        let blur = 0;
        let ss = false;

        if(this.shadow){
            let mats = this.shadow.match(/(#[0-9a-f]{6})|(rgb\(.*?\))|(rgba\(.*?\))/);
            if(mats.length > 0){
                this.shadow = mats[1].trim() + ' ' +  this.shadow.replace(mats[1], '').trim();
                let s = this.shadow.split(' ');
                color = s[0];
                x = s[1].replace('px', '');
                y = s[2].replace('px', '');
                blur = s[3].replace('px', '');
                ss = true;
            }
        }
        return {
            color: color,
            blur: blur,
            x: x,
            y: y,
            showShadow: ss
        };
    },
    watch: {
        'color': function(val, oldVal){
            this.change([this.color, this.x  + 'px', this.y  + 'px', this.blur  + 'px'].join(' '));
        },
        'blur': function(val, oldVal){
            this.change([this.color, this.x  + 'px', this.y  + 'px', this.blur  + 'px'].join(' '));
        },
        'x': function(val, oldVal){
            this.change([this.color, this.x  + 'px', this.y  + 'px', this.blur  + 'px'].join(' '));
        },
        'y': function(val, oldVal){
            this.change([this.color, this.x  + 'px', this.y  + 'px', this.blur  + 'px'].join(' '));
        },
        'showShadow': function(val, oldVal){
            if(!val){
                this.change('none');
            }
        }
    }
}
</script>

<style>
    .compo-styleshadow{
        display: inline-block;
        vertical-align: top;
        padding: 2px;
        width: 79%;
    }
    .compo-styleshadow-content{
        padding: 5px;
    }
    .sb-select{
        display: inline-block;
        vertical-align: middle;
    }
</style>